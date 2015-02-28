package de.eliyo.beans;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;

@ManagedBean
@RequestScoped
public class Wanted {

	private String email;
	private String search;
	private String weburl;
	private int interval;
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSearch() {
		return search;
	}

	public void setSearch(String search) {
		this.search = search;
	}

	public String getWeburl() {
		return weburl;
	}

	public void setWeburl(String weburl) {
		this.weburl = weburl;
	}

	public int getInterval() {
		return interval == 0 ? 10 : interval;
	}

	public void setInterval(int interval) {
		this.interval = interval;
	}
	
}