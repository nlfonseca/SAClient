package pt.saclient.servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.URL;
import java.net.URLConnection;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet implementation class upload
 */
@WebServlet("/upload")
public class upload extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public upload() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#service(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String userId = request.getParameter("userId");
		
		URL url = new URL("http://localhost:8080/INSTAGRAMALIKE/users/" + userId + "/uploadPhoto");
		URLConnection con = url.openConnection();
		BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
		
		String inputline;
		String message = "";
		while ((inputline = in.readLine()) != null) {
			message = inputline;
		}
		in.close();
		
		if (!message.equals("Error")) {
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
