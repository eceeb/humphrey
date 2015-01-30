package de.eliyo.controller;

import java.net.URI;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;

@ManagedBean
@ApplicationScoped
public class DatabaseController {

	private Connection con;

	public boolean insert(String email, String search, String website) {
		try {
			if (con == null)
				con = getConnection();
	
			String q = "insert into wanted (url, seek, email) values (?,?,?);";
			PreparedStatement stmt = con.prepareStatement(q);
			stmt.setString(1, website);
			stmt.setString(2, search);
			stmt.setString(3, email);
			stmt.executeUpdate();
		} catch (Exception x) {
			System.out.println(x);
			return false;
		}
		return true;
	}
	
	private Connection getConnection() throws Exception {
		URI dbUri = new URI(System.getenv("DB_URL"));

		String username = dbUri.getUserInfo().split(":")[0];
		String password = dbUri.getUserInfo().split(":")[1];
		String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + dbUri.getPath();
		return DriverManager.getConnection(dbUrl, username, password);
	}

}
