package pt.saclient.servlet;

import java.io.BufferedReader;
import java.io.IOException;
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
	 * @see HttpServlet#service(HttpServletRequest request, HttpServletResponse response)
	 */
	//protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String email = request.getParameter("mail");
		String password = request.getParameter("passwd");
		
		String host = "192.168.1.5:9763";
		
		URL url = new URL("http://" + host + "/SARestFul_1.0.0/1.0/services/servidorjaxrs/services/login?mail=" + email + "&passwd=" + password);
		HttpURLConnection con = (HttpURLConnection) url.openConnection();
		con.setRequestMethod("POST");
		
		BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream(), "UTF-8"));
		StringBuilder sb = new StringBuilder();
		String line = null;
        
		while ((line = br.readLine()) != null) {
            sb.append(line + "\n");
        }
        br.close();
        
        String jsonData = "[" + sb.toString() + "]";
        JSONArray jObj = null;
		
        try {
            jObj = new JSONArray(jsonData);
            System.out.println("jObj = " + jObj);
            
        } catch (JSONException e) {
        	e.printStackTrace();
        }
        
        // tentar ver isto
		JSONObject json = new JSONObject(sb);
		System.out.println("json = " + json);
        
        try {
			
			// h‡ dados
			if (!json.toString().equals("{}")) {
				
				JSONObject userJSON = json.getJSONObject("User");
				
				// extrair dados do user
				try {
					User usr = new User();
					
					usr.setId(userJSON.getInt("id"));
					usr.setCC(userJSON.getLong("CC"));
					usr.setEmail(userJSON.getString("email"));
					usr.setUsername(userJSON.getString("username"));
					usr.setPhoto(userJSON.getString("photo"));
					
					System.out.println("id = " + userJSON.getInt("id"));
					System.out.println("cc = " + userJSON.getLong("CC"));
					System.out.println("email = " + userJSON.getString("email"));
					System.out.println("username = " + userJSON.getString("username"));
					System.out.println("photo = " + userJSON.getString("photo"));
					
					HttpSession session = request.getSession();
					session.setAttribute("email", email);
					
					//redirect to index
					String r = "http://localhost:8080/saclient/index.jsp";
					response.sendRedirect(r);
					
				} catch (JSONException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				
			} else {
				
				//redirect to login
				String r = "http://localhost:8080/saclient/login.jsp";
				response.sendRedirect(r);
			}
			
		} catch (JSONException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
	}
}
