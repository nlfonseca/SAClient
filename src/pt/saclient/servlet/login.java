package pt.saclient.servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.URL;
import java.net.URLConnection;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.tomcat.util.http.fileupload.IOUtils;

/**
 * Servlet implementation class login
 */
@WebServlet(description = "Login Servlet", urlPatterns = { "/login" })
public class login extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public login() {
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
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//System.out.println("================ aqui =================");
		
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		
		URL url = new URL("http://localhost:8080/INSTAGRAMALIKE/users/login?username=" + username + "&password=" + password);
		URLConnection con = url.openConnection();
		BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
		
		String inputline;
		String message = "";
		while ((inputline = in.readLine()) != null) {
			message = inputline;
		}
		in.close();
		
		if (!message.equals("Error")) {
			HttpSession session = request.getSession();
			session.setAttribute("username", username);
			session.setAttribute("userId", message);
			
			//redirect to index
			String r = "http://localhost:8080/insta/index.jsp";
			response.sendRedirect(r);
			
		} else {
			message = "Erro";
			// show error message
			response.setContentType("text/html");
			PrintWriter out = response.getWriter();
			out.println("<font size='6' color='red'>" + message + "</font>");
		}
	}

}
