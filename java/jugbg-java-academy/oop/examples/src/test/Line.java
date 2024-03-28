package test;

public class Line {
  private Point start;
  private Point end;
  
  public Line() {
    this(new Point(), new Point());
  }

  public Line(Point start, Point end) {
    this.start = start;
    this.end = end;
  }

  public Point getStart() { return this.start; }
  public void setStart(Point start) { this.start = start; }
  public Point getEnd() { return this.end; }
  public void setEnd(Point end) { this.end = end; }

  public String toString() { return String.format("[%s,%s]", this.start, this.end); }

  public static void main(String[] args) {
    System.out.println(new Line(new Point(1, 2), new Point(3, 5)));


    Point start = new Point();
    start.setX(10);
    start.setY(20);
    Point end = new Point();
    end.setX(100);
    end.setY(200);
    Line line = new Line();
    line.setStart(start);
    line.setEnd(end);
    System.out.println(line.toString());
  }
}

class Point {
  private int x;
  private int y;

  public Point() {
    this(0, 0);
  }

  public Point(int x, int y) {
    this.x = x;
    this.y = y;
  }

  public int getX() { return this.x; }
  public void setX(int x) { this.x = x; }
  public int getY() { return this.y; }
  public void setY(int y) { this.y = y; }

  public String toString() { return String.format("(%d,%d)", this.x, this.y); }
}
