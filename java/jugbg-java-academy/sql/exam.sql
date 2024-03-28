drop schema if exists jugbg;
create schema jugbg;
use jugbg;

create table Employees (
  Id int not null auto_increment,
  Name varchar(256) not null,
  Email varchar(256) not null unique,
  Salary int,
  primary key (Id)
);

create table Bonuses (
  Id int not null auto_increment,
  EmployeeId int not null,
  Bonus int,
  primary key (Id),
  foreign key (EmployeeId) references Employees (Id)
);

create table Departments (
  Id int not null auto_increment,
  Name varchar(256) not null unique,
  primary key(Id)
);

create table EmployeeDepartments (
  Id int not null auto_increment,
  EmployeeId int not null,
  DepartmentId int not null,
  primary key (Id),
  foreign key (EmployeeId) references Employees (Id),
  foreign key (DepartmentId) references Departments (Id)
);


delimiter `function;`;

create function employeeIdByEmail(email varchar(256)) returns int deterministic begin
declare id int;
select e.Id into id
from Employees e
where e.Email = email;
return id;
end function;

create function departmentIdByName(name varchar(256)) returns int deterministic begin
declare id int;
select d.Id into id
from Departments d
where d.Name = name;
return id;
end function;

delimiter `procedure;`;

create procedure init() begin
insert into Employees(Name, Email, Salary)
values ('alice', 'alice@acme.com', 3000),
  ('bob', 'bob@acme.com', 4000),
  ('carie', 'carie@acme.com', 1000),
  ('dave', 'dave@acme.com', 1000);

select employeeIdByEmail('alice@acme.com') into @alice;
select employeeIdByEmail('dave@acme.com') into @dave;
select employeeIdByEmail('carie@acme.com') into @carie;
select employeeIdByEmail('carie@acme.com') into @carie;

insert into Bonuses(EmployeeId, Bonus)
values (@alice, 2000),
  (@dave, 2500);

insert into Departments(Name)
values ('hr'),
  ('it'),
  ('rd');

select departmentIdByName('hr') into @hr;
select departmentIdByName('it') into @it;

insert into EmployeeDepartments(EmployeeId, DepartmentId)
values (@alice, @it),
  (@dave, @it),
  (@carie, @hr);

end procedure;

create procedure describeSchema() begin describe Employees;
describe Bonuses;
describe EmployeeBonuses;
describe EmployeeDepartments;
describe Departments;
end procedure;

delimiter `;`;


create view EmployeeSalaries as
select distinct Salary
from Employees
order by Salary asc;


create view EmployeeBonuses as
select Name,
  Salary,
  Bonus
from Employees e
  left join Bonuses b on e.Id = b.EmployeeId;


create view EmployeeDepartmentDetails as
select e.Name,
  d.Name as Department
from Employees e
  left join EmployeeDepartments ed on e.Id = ed.EmployeeId
  left join Departments d on d.Id = ed.DepartmentId;


create view HighpaidEmployees as
select Name,
  Salary
from Employees
where Salary > (
    select max(Bonus)
    from Bonuses
  );

create view SalariesCount as
select Salary,
  count(*) as Count
from Employees
group by Salary;


create view DepartmentEmploeesCount as
select d.Name,
  coalesce(count(ed.EmployeeId), 0) as Count
from Departments d
  left join EmployeeDepartments ed on d.Id = ed.DepartmentId
group by d.Id;


call init();
call describeSchema();