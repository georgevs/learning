// https://junit.org/junit5/docs/5.0.1/api/org/junit/jupiter/api/Assertions.html

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

public class JdbcExampleTest {
  @BeforeAll
  public static void beforeAll() throws IOException, InterruptedException {
    // Class.forName("com.mysql.cj.jdbc.Driver");
    initDatabase();
  }

  private static void initDatabase() throws IOException, InterruptedException {
    var pb = new ProcessBuilder("mysql");
    var process = pb.start();

    try (var outs = process.getOutputStream();
        var ins = JdbcExampleTest.class.getResourceAsStream("create-db-hr.sql")) {

      var buf = new byte[4096];
      int bytesRead;
      while ((bytesRead = ins.read(buf)) != -1) {
        outs.write(buf, 0, bytesRead);
        outs.flush();
      }
    }

    assertEquals(0, process.waitFor());
  }

  @Test
  public void testCountRecords() throws SQLException {
    assertEquals(20, countRecords(JdbcExample.connect()));
  }

  public int countRecords(java.sql.Connection connection) {
    try (java.sql.Statement statement = connection.createStatement();
        java.sql.ResultSet rs = statement.executeQuery("select count(*) from employees")) {
      return rs.next() ? rs.getInt(1) : 0;
    } catch (java.sql.SQLException ex) {
      return 0;
    }
  }

  @Test
  public void testCreateLogsTable() throws SQLException {
    createLogsTable(JdbcExample.connect(), 1);
    createLogsTable(JdbcExample.connect(), 10);
  }

  public void createLogsTable(java.sql.Connection connection, int entriesCount) {
    try (java.sql.Statement statement = connection.createStatement()) {
      statement.addBatch("drop table if exists Logs");
      statement.addBatch("create table Logs(Id int, Message varchar(100))");
      statement.executeBatch();
    } catch (java.sql.SQLException ex) {
      System.out.println(ex.getMessage());
      return;
    }
    String sql = "insert into Logs(Id, Message) values (?,?)";
    try (java.sql.PreparedStatement statement = connection.prepareStatement(sql)) {
      for (int i = 1; i <= entriesCount; ++i) {
        statement.setInt(1, i);
        statement.setString(2, "");
        statement.addBatch();
      }
      statement.executeBatch();
    } catch (java.sql.SQLException ex) {
      System.out.println(ex.getMessage());
    }
  }

  @Test
  public void testMetaData() throws SQLException {
    try (var connection = JdbcExample.connect()) {
      assertEquals(Connection.TRANSACTION_REPEATABLE_READ, connection.getTransactionIsolation());
      assertTrue(connection.getAutoCommit());

      var md = connection.getMetaData();

      final int TABLE_NAME = 3;
      var tables = new ArrayList<String>();
      try (var rs = md.getTables("sql_hr", null, null, null)) {
        while (rs.next()) {
          tables.add(rs.getString(TABLE_NAME));

          // ResultSetMetaData tableMetadata = rs.getMetaData();
          // for (int i = 1; i <= tableMetadata.getColumnCount(); i++) {
          // tableMetadata.getColumnName(i);
          // tableMetadata.getColumnTypeName(i);
          // }
        }
      }
      Collections.sort(tables);
      assertEquals(Arrays.asList("employees", "offices"), tables);

      final int COLUMN_NAME = 4;
      var columns = new ArrayList<String>();
      try (var rs = md.getColumns("sql_hr", null, "employees", null)) {
        while (rs.next()) {
          columns.add(rs.getString(COLUMN_NAME));
        }
      }
      Collections.sort(columns);
      var expectedColumns = Arrays.asList(
          "employee_id", "first_name", "job_title",
          "last_name", "office_id", "reports_to", "salary");
      assertEquals(expectedColumns, columns);
    }
  }

  @Test
  public void testQuery() throws SQLException {
    try (var connection = JdbcExample.connect()) {
      var hr = new JdbcExample.HR(connection);

      var employees = hr.getEmployees();

      Collections.sort(employees, JdbcExample.HR.Employee.ID);
      var expectedEmployeesById = Arrays.asList(
          new JdbcExample.HR.Employee(33391, "D'arcy", "Nortunen"),
          new JdbcExample.HR.Employee(37270, "Yovonnda", "Magrannell"),
          new JdbcExample.HR.Employee(37851, "Sayer", "Matterson"));
      assertEquals(expectedEmployeesById, employees.subList(0, 3));

      Collections.sort(employees, JdbcExample.HR.Employee.NAME);
      var expectedEmployeesByName = Arrays.asList(
          new JdbcExample.HR.Employee(63196, "Alaster", "Scutchin"),
          new JdbcExample.HR.Employee(95213, "Cole", "Kesterton"),
          new JdbcExample.HR.Employee(33391, "D'arcy", "Nortunen"));
      assertEquals(expectedEmployeesByName, employees.subList(0, 3));

      assertEquals(
          new JdbcExample.HR.Employee(37270, "Yovonnda", "Magrannell"),
          hr.getEmployeeById(37270));

      assertNull(hr.getEmployeeById(123));
    }
  }

  @Test
  public void testInsert() throws SQLException {
    try (var connection = JdbcExample.connect()) {
      var hr = new JdbcExample.HR(connection);

      var alice = new JdbcExample.HR.Employee(200001, "Alice", "Henderson");
      var bob = new JdbcExample.HR.Employee(200002, "Bob", "Doe");

      assertEquals(2, hr.addEmployees(Arrays.asList(alice, bob)));

      assertEquals(alice, hr.getEmployeeById(200001));
      assertEquals(bob, hr.getEmployeeById(200002));
    }
  }

  @Test
  public void testUpdate() throws SQLException {
    try (var connection = JdbcExample.connect()) {
      var hr = new JdbcExample.HR(connection);

      assertEquals(1, hr.addEmployees(Arrays.asList(new JdbcExample.HR.Employee(300001, "Charlie", "Brown"))));

      assertEquals(
          new JdbcExample.HR.Employee(300001, "Charlie", "Brown"),
          hr.getEmployeeById(300001));

      assertEquals(1, hr.updateEmployees(Arrays.asList(new JdbcExample.HR.Employee(300001, "Charlie", "Black"))));

      assertEquals(
          new JdbcExample.HR.Employee(300001, "Charlie", "Black"),
          hr.getEmployeeById(300001));
    }
  }

  @Test
  public void testRemove() throws SQLException {
    try (var connection = JdbcExample.connect()) {
      var hr = new JdbcExample.HR(connection);

      assertEquals(1, hr.addEmployees(Arrays.asList(new JdbcExample.HR.Employee(300002, "Dave", "Cox"))));

      assertEquals(
          new JdbcExample.HR.Employee(300002, "Dave", "Cox"),
          hr.getEmployeeById(300002));

      assertEquals(1, hr.removeEmployees(Arrays.asList(new JdbcExample.HR.Employee(300002, "Dave", "Cox"))));

      assertNull(hr.getEmployeeById(300002));
    }
  }
}
