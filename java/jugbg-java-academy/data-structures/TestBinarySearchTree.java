public class TestBinarySearchTree {
  public static void main(String[] args) {
    new TestBinarySearchTree().testBinarySearch();
  }

  void testBinarySearch() {
    var values = new int[] { 1, 2, 3 };
    System.out.println(
      new BinarySearchTree(values)
    );
    System.out.println(
      new BinarySearchTree(values)
        .insert(3)
    );
    System.out.println(
      new BinarySearchTree(values)
        .insert(4)
    );
    System.out.println(
      new BinarySearchTree(values)
        .traverse()
    );
  }
}


class BinarySearchTree {
  private Node root;

  public BinarySearchTree() { this.root = null; }
  public BinarySearchTree(int... values) {
    this();
    for (var value: values) {
      insert(value);
    }
  }

  public boolean insert(int value) {
    if (search(value)) { return false; }
    return (root = insertValue(root, value)) != null;
  }
  private static Node insertValue(Node root, int value) {
    if (root == null) { return new Node(value); }
    else if (value == root.getValue()) { return root; }
    else if (value < root.getValue()) { return root.setLeft(insertValue(root.getLeft(), value)); }
    else { return root.setRight(insertValue(root.getRight(), value)); }
  }
  public boolean search(int value) {
    return searchTree(root, value);
  }
  private static boolean searchTree(Node root, int value) {
    if (root == null) { return false; }
    else if (value == root.getValue()) { return true; }
    else if (value < root.getValue()) { return searchTree(root.getLeft(), value); }
    else { return searchTree(root.getRight(), value); }
  }
  public java.util.List<Integer> traverse() {
    return addTree(root, new java.util.LinkedList<Integer>());
  }
  private static java.util.List<Integer> addTree(Node root, java.util.List<Integer> list) {
    if (root.getLeft() != null) { addTree(root.getLeft(), list); }
    list.add(root.getValue());
    if (root.getRight() != null) { addTree(root.getRight(), list); }
    return list;
  }
  public String toString() { return String.format("BinarySearchTree(%s)", root);  } 
}

class Node {
  private int value;
  private Node left;
  private Node right;

  public Node(int value) {
    this(value, null, null);
  }
  public Node(int value, Node left, Node right) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
  public int getValue() { return value; }
  public Node setValue(int value) { this.value = value; return this; }
  public Node getLeft() { return left; }
  public Node setLeft(Node left) { this.left = left; return this; }
  public Node getRight() { return right; }
  public Node setRight(Node right) { this.right = right; return this; }
  public String toString() { return String.format("Node(%d,%s,%s)", value, left, right); }
}
