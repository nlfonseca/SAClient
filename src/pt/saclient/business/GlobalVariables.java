package pt.saclient.business;

public class GlobalVariables {
	
	public static final String HOST = "172.16.7.152:9763";//"192.168.1.67:9763";
	
	/**
	 * convertStreamToString
	 * 
	 * @param is
	 * @return
	 */
	public static String convertStreamToString(java.io.InputStream is) {
		java.util.Scanner s = new java.util.Scanner(is).useDelimiter("\\A");
		return s.hasNext() ? s.next() : "";
	}
}
