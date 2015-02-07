package pt.saclient.servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.Charset;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import pt.saclient.business.User;

/**
 * Servlet implementation class Login
 */
@WebServlet("/login")
public class Login extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Login() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see Servlet#init(ServletConfig)
	 */
	public void init(ServletConfig config) throws ServletException {
		// TODO Auto-generated method stub
	}
	
	/**
	 * convertStreamToString
	 * 
	 * @param is
	 * @return
	 */
	static String convertStreamToString(java.io.InputStream is) {
		java.util.Scanner s = new java.util.Scanner(is).useDelimiter("\\A");
		return s.hasNext() ? s.next() : "";
	}

	/**
	 * @see HttpServlet#service(HttpServletRequest request, HttpServletResponse response)
	 */
	//protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String email = request.getParameter("mail");
		String password = request.getParameter("passwd");
		
		// String host = "192.168.1.5:9763";
		String host = "172.16.4.209:9763";
		
		// http://172.16.4.209:9763/SARestFul_1.0.0/1.0/services/servidorjaxrs
		URL url = new URL("http://" + host + "/SARestFul_1.0.0/1.0/services/servidorjaxrs/services/login?mail=" + email + "&passwd=" + password);
		HttpURLConnection con = (HttpURLConnection) url.openConnection();
		con.setRequestMethod("POST");
		con.setRequestProperty("Accept", "application/json");
		
		// Erro de conex‹o
		if (con.getResponseCode() != 200) {
			throw new RuntimeException("Failed : HTTP error code : " + con.getResponseCode());
		}
		
		InputStream stream = con.getInputStream();
		String data = convertStreamToString(stream);
		
		// JSON Object
		JSONObject json;
		
		try {
			json = new JSONObject(data);
			
			// h‡ dados
			if (!json.toString().equals("{}")) {
				
				JSONObject userJSON = json.getJSONObject("User");
				System.out.println(userJSON);
				
				// extrair dados do user
				try {
					User usr = new User();
					
					usr.setId(userJSON.getInt("id"));
					usr.setCC(userJSON.getLong("CC"));
					usr.setEmail(userJSON.getString("email"));
					usr.setUsername(userJSON.getString("username"));
					usr.setId(userJSON.getInt("isAdmin"));
					usr.setPhoto(userJSON.getString("photo"));
					
					HttpSession session = request.getSession();
					session.setAttribute("usr_id", usr.getId());
					session.setAttribute("usr_email", usr.getEmail());
					session.setAttribute("usr_cc", usr.getCC());
					session.setAttribute("usr_username", usr.getUsername());
					session.setAttribute("usr_is_admin", usr.getIsAdmin());
					session.setAttribute("usr_photo", usr.getPhoto());
					
					//redirect to index
					if (usr.getIsAdmin() == 1) {
						String r = "http://localhost:8080/saclient/indexAdmin.jsp";
						response.sendRedirect(r);
					
					} else {
						String r = "http://localhost:8080/saclient/index.jsp";
						response.sendRedirect(r);
					}
					
					
				} catch (JSONException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				
			} else {
				
				//redirect to login
				String r = "http://localhost:8080/saclient/login.jsp";
				response.sendRedirect(r);
			}
			
		} catch (JSONException e2) {
			// TODO Auto-generated catch block
			e2.printStackTrace();
		}
	}
}
