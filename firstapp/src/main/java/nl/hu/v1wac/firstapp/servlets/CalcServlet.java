/**
 * 
 */
package nl.hu.v1wac.firstapp.servlets;

/**
 * @author Tim
 *
 */

import java.io.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet(urlPatterns = "/CalcServlet.do")
public class CalcServlet extends HttpServlet{

	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
	{
		int calc1 = Integer.parseInt(req.getParameter("calc1"));
		int calc2 = Integer.parseInt(req.getParameter("calc2"));
		
		String type = req.getParameter("sb");
		
		PrintWriter out = resp.getWriter();
        resp.setContentType("text/html");
        
        out.println("<!DOCTYPE html>");
        out.println("<html>");
        out.println("  <title>Calculator is a go</title>");
        out.println("  <body>");
        out.println("	<h1>This is just a test</h1>");
        out.println("		Your numbers are:");
        out.println(calc1);
        out.println(calc2);
        
        if(type.equals("divide")) {
        	out.println("		divided by each other these are");
        	out.println("       <br>");
        	out.println("		" + (calc1/calc2) + "| or" + (calc2/calc1));
        	
        }
        else if(type.equals("times")) {
        	out.println("		times each other these are");
        	out.println("       <br>");
        	out.println("		" + (calc1*calc2));
        	out.println("        and nothing else, because multiplication is communative");
        }
        else if(type.equals("add")) {
        	out.println("		add each other these are");
        	out.println("       <br>");
        	out.println("		" + (calc1+calc2));
        	out.println("        and nothing else, because addition is communative");
        }
        else if(type.equals("subtract")) {
        	out.println("		 subtract each other these are");
        	out.println("       <br>");
        	out.println("		" + (calc1-calc2) + "| or" + (calc2-calc1));
        	
        }
        else {
            out.println("		and we have no idea what to do with them");
        }
        
	}
}
