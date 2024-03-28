
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class CollectionsExample {
  public static void main(String[] args) {
    new CollectionsExample().test();
  }
  
  void test() {
    printNames(employees());
    System.out.println(totalSalary(employees()));
    System.out.println(totalSalaryByDepartment(employees()));
    System.out.println(partitionByBigSalary(employees()));
    System.out.println(groupByDepartment(employees()));
    System.out.println(groupByDepartmentThenCity(employees()));
  }

  Map<String, Map<String, List<Employee>>> groupByDepartmentThenCity(Employee[] employees) {
    return Arrays.stream(employees)
      .collect(
        Collectors.groupingBy(
          Employee::getDepartment,
          Collectors.groupingBy(Employee::getCity)));
  }

  Map<String, List<Employee>> groupByDepartment(Employee[] employees) {
    return Arrays.stream(employees)
     .collect(
        Collectors.groupingBy(Employee::getDepartment)); 
  }
  
  Map<Boolean, List<Employee>> partitionByBigSalary(Employee[] employees) {
     return Arrays.stream(employees)
      .collect(
        Collectors.partitioningBy(e -> e.getSalary() >= 200)); 
  }

  Map<String, Integer> totalSalaryByDepartment(Employee[] employees) {
    return Arrays.stream(employees)
      .collect(
        Collectors.groupingBy(
          Employee::getDepartment, 
          Collectors.summingInt(Employee::getSalary)));
  }

  int totalSalary(Employee[] employees) {
    return Arrays.stream(employees)
      .collect(Collectors.summingInt(Employee::getSalary));
  }

  void printNames(Employee[] employees) {
    Arrays.stream(employees)
      .map(Employee::getName)
      .forEach(e -> System.out.println(e));
  }

  Employee[] employees() {
    return new Employee[] { 
      new Employee("Alice", 100, "HR", "LA"), 
      new Employee("Bob", 200, "IT", "LA"),
      new Employee("Carol", 300, "IT", "NY"),
      new Employee("Dave", 300, "IT", "LA"),
    };
  }
}


class Employee {
  String name;
  int salary;
  String department;
  String city;

  Employee(String name, int salary, String department, String city) {
    this.name = name;
    this.salary = salary;
    this.department = department;
    this.city = city;
  }
  int getSalary() { return this.salary; }
  void setSalary(int salary) { this.salary = salary; }
  String getName() { return this.name; }
  void setName(String name) { this.name = name; }
  String getDepartment() { return this.department; }
  void setDepartment(String department) { this.department = department; }
  String getCity() { return this.city; }
  void setCity(String city) { this.city = city; }
  public String toString() {
    return String.format(
      "Employee(%s,%d,%s,%s)", 
      this.name, this.salary, this.department, this.city);
  }
}
