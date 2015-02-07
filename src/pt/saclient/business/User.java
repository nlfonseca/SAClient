package pt.saclient.business;

public class User {
	
	/**
	 * Variables
	 */
	private int userId;
	private long cc;
	private String username;
	private String password;
	private String email;
	private int isAdmin;
	private String photo;
	
	/**
	 * Constructor of User
	 */
	public User() {
		this.userId = -1;
		this.cc = -1;
		this.username = null;
		this.password = null;
		this.email = null;
		this.isAdmin = -1;
		this.photo = null;
	}
	
	// ============================================
	// GETS
	// ============================================
	/**
	 * getId()
	 * @return id
	 */
	public int getId() {
		return userId;
	}
	
	/**
	 * getCC()
	 * @return cc
	 */
	public long getCC() {
		return cc;
	}
	
	/**
	 * getUsername()
	 * @return username
	 */
	public String getUsername() {
		return username;
	}
	
	/**
	 * getPassword()
	 * @return password
	 */
	public String getPassword() {
		return password;
	}
	
	/**
	 * getEmail()
	 * @return email
	 */
	public String getEmail() {
		return email;
	}
	
	/**
	 * getIsAdmin()
	 * @return isAdmin
	 */
	public int getIsAdmin() {
		return isAdmin;
	}
	
	/**
	 * getPhoto()
	 * @return photo
	 */
	public String getPhoto() {
		return photo;
	}
	
	// ============================================
	// SETS
	// ============================================
	/**
	 * setId()
	 * @param i
	 */
	public void setId(int i) {
		this.userId = i;
	}
	
	/**
	 * setCC()
	 * @param userCC
	 */
	public void setCC(long userCC) {
		this.cc = userCC;
	}
	
	/**
	 * setUsername()
	 * @param uName
	 */
	public void setUsername(String uName) {
		this.username = uName;
	}
	
	/**
	 * setPassword()
	 * @param uPass
	 */
	public void setPassword(String uPass) {
		this.password = uPass;
	}
	
	/**
	 * setEmail()
	 * @param uEmail
	 */
	public void setEmail(String uEmail) {
		this.email = uEmail;
	}
	
	/**
	 * setIsAdmin()
	 * @param uIsAdmin
	 */
	public void setIsAdmin(int uIsAdmin) {
		this.isAdmin = uIsAdmin;
	}
	
	/**
	 * setPhoto()
	 * @param cPhoto
	 */
	public void setPhoto(String uPhoto) {
		this.photo = uPhoto;
	}
}
