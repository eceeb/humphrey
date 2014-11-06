package eliyo.de.main;

import java.net.URI;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class DatabaseController {

	private Connection con = null;

	public boolean insert(String email, String search, String website) {
		try {
			if (con == null)
				con = getConnection();
			
			System.out.println("insert called");
			Statement stmt = con.createStatement();

			String q = "insert into search values ('" + email + "', '" + website + "', '" + search + "', false)";
			stmt.executeUpdate(q);
		} catch (Exception x) {
			System.out.println("" + x);
			return false;
		}
		return true;
	}
//
	private Connection getConnection() throws Exception {
		URI dbUri = new URI(System.getenv("DB_URL"));

		String username = dbUri.getUserInfo().split(":")[0];
		String password = dbUri.getUserInfo().split(":")[1];
		String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + dbUri.getPath();
		return DriverManager.getConnection(dbUrl, username, password);
	}

}
