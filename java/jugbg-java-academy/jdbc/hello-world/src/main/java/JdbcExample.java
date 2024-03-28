import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Comparator;
import java.util.List;

class JdbcExample {
  public static void main(String[] args) {
    System.out.println("Hello world!");
  }

  public static Connection connect() throws SQLException {
    // https://docs.oracle.com/javase/tutorial/jdbc/basics/connecting.html

    // Connection connection =
    // DriverManager.getConnection("jdbc:mysql://dev-mysql:3306/sql_hr?user=root&password=LikeBeingThere");

    Connection connection = DriverManager.getConnection(
        "jdbc:mysql://dev-mysql:3306/sql_hr",
        "root", "LikeBeingThere");

    // Properties properties = new Properties();
    // properties.put("user", "root");
    // properties.put("password", "LikeBeingThere");
    // Connection connection = DriverManager.getConnection(
    // "jdbc:mysql://dev-mysql:3306/sql_hr",
    // properties
    // );

    return connection;
  }

  public static class HR {
    public Connection connection;

    public static class Employee {
      public int employeeId;
      public String firstName;
      public String lastName;

      public Employee(int employeeId, String firstName, String lastName) {
        this.employeeId = employeeId;
        this.firstName = firstName;
        this.lastName = lastName;
      }

      @Override
      public String toString() {
        return String.format("Employee(%d %s %s)", this.employeeId, this.firstName, this.lastName);
      }

      @Override
      public boolean equals(Object o) {
        if (!(o instanceof Employee)) {
          return false;
        }
        Employee other = (Employee) o;
        return other.employeeId == employeeId &&
            other.firstName.equals(firstName) &&
            other.lastName.equals(lastName);
      }

      static final Comparator<Employee> NAME = new Comparator<Employee>() {
        public int compare(Employee lhs, Employee rhs) {
          int result;
          if ((result = lhs.firstName.compareTo(rhs.firstName)) == 0)
            result = lhs.lastName.compareTo(rhs.lastName);
          return result;
        }
      };

      static final Comparator<Employee> ID = new Comparator<Employee>() {
        public int compare(Employee lhs, Employee rhs) {
          return lhs.employeeId - rhs.employeeId;
        }
      };
    }

    public HR(Connection connection) {
      this.connection = connection;
    }

    public List<Employee> getEmployees() throws SQLException {
      try (Statement statement = this.connection.createStatement()) {
        String sql = "select employee_id, first_name, last_name from employees";
        try (ResultSet rs = statement.executeQuery(sql)) {
          ArrayList employees = new ArrayList<Employee>();
          while (rs.next()) {
            int employeeId = rs.getInt(1);
            String firstName = rs.getString(2);
            String lastName = rs.getString(3);
            employees.add(new Employee(employeeId, firstName, lastName));
          }
          return employees;
        }
      }
    }

    public Employee getEmployeeById(int employeeId) throws SQLException {
      String sql = "select first_name, last_name from employees where employee_id=?";
      try (PreparedStatement statement = this.connection
          .prepareStatement(sql)) {
        statement.setInt(1, employeeId);
        try (ResultSet rs = statement.executeQuery()) {
          if (!rs.next()) {
            return null;
          }
          String firstName = rs.getString(1);
          String lastName = rs.getString(2);
          return new Employee(employeeId, firstName, lastName);
        }
      }
    }

    public int addEmployees(Collection<Employee> employees) throws SQLException {
      var sql = "insert into employees(employee_id,first_name,last_name) values(?,?,?)";
      try (var statement = this.connection.prepareStatement(sql)) {
        for (var employee : employees) {
          statement.setInt(1, employee.employeeId);
          statement.setString(2, employee.firstName);
          statement.setString(3, employee.lastName);
          statement.addBatch();
        }
        var numAdded = Arrays.stream(statement.executeBatch()).sum();
        return numAdded;
      }
    }

    public int updateEmployees(Collection<Employee> employees) throws SQLException {
      var sql = "update employees set first_name=?,last_name=? where employee_id=?";
      try (var statement = this.connection.prepareStatement(sql)) {
        for (var employee : employees) {
          statement.setString(1, employee.firstName);
          statement.setString(2, employee.lastName);
          statement.setInt(3, employee.employeeId);
          statement.addBatch();
        }
        var numUpdated = Arrays.stream(statement.executeBatch()).sum();
        return numUpdated;
      }
    }

    public int removeEmployees(Collection<Employee> employees) throws SQLException {
      var sql = "delete from employees where employee_id=? and first_name=? and last_name=?";
      try (var statement = this.connection.prepareStatement(sql)) {
        for (var employee : employees) {
          statement.setInt(1, employee.employeeId);
          statement.setString(2, employee.firstName);
          statement.setString(3, employee.lastName);
          statement.addBatch();
        }
        var numDeleted = Arrays.stream(statement.executeBatch()).sum();
        return numDeleted;
      }
    }
  }
}
