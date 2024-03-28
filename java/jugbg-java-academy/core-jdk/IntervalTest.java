/*
  Build and run:
    javac -d ./bin/ ./core-jdk/IntervalTest.java && java -cp ./bin/ IntervalTest
*/

public class IntervalTest {
  public static void main(String[] args) {
    System.out.println(new Interval("(-2,-1)"));
    System.out.println(new Interval("(-2,-1]"));
    System.out.println(new Interval("[-2,-1)"));
    System.out.println(new Interval("[-2,-1]"));

    System.out.println(new Interval("(1,2)"));
    System.out.println(new Interval("(1,2]"));
    System.out.println(new Interval("[1,2)"));
    System.out.println(new Interval("[1,2]"));

    System.out.println(new Interval("(,2)"));
    System.out.println(new Interval("(,2]"));
    System.out.println(new Interval("[,2)"));
    System.out.println(new Interval("[,2]"));

    System.out.println(new Interval("(1,)"));
    System.out.println(new Interval("(1,]"));
    System.out.println(new Interval("[1,)"));
    System.out.println(new Interval("[1,]"));
  }
}

class Interval {
  private java.util.regex.Pattern re = java.util.regex.Pattern.compile("^([\\(\\[])(-?\\d*),(-?\\d*)([\\)\\]])");

  static record IntervalData(boolean isStartOpened, boolean isEndOpened, Integer start, Integer end) {
    public IntervalData {
      if (start != null && end != null && end.compareTo(start) < 0) {
        throw new IllegalArgumentException("Invalid interval");
      }
    }
  }

  public final static IntervalData NullIntervalData = new IntervalData(false, false, null, null);
  private IntervalData data = NullIntervalData;

  public Interval() {
  }

  public Interval(String interval) {
    init(interval);
  }

  public void init(String interval) {
    var matcher = re.matcher(interval);
    try {
      data = !matcher.find() ? NullIntervalData
          : new IntervalData(
              "(".equals(matcher.group(1)),
              ")".equals(matcher.group(4)),
              matcher.group(2).isEmpty() ? null : Integer.parseInt(matcher.group(2)),
              matcher.group(3).isEmpty() ? null : Integer.parseInt(matcher.group(3)));
    } catch (Exception e) {
      // absorb exception
    }
  }

  public boolean isStartOpened() {
    return data.isStartOpened();
  }

  public boolean isEndOpened() {
    return data.isEndOpened();
  }

  public Integer getStart() {
    return data.start();
  }

  public Integer getEnd() {
    return data.end();
  }

  public String toString() {
    return String.format("Interval{%s %d %d %s}", isStartOpened(), getStart(), getEnd(), isEndOpened());
  }
}
