package com.entity;

import java.util.Date;

public class Admins {
	private Integer admid;
	private String admName;
	private String admPwd;
	private String admPhoto;
	private Date admTime;
	public Integer getAdmid() {
		return admid;
	}
	public void setAdmid(Integer admid) {
		this.admid = admid;
	}
	public String getAdmName() {
		return admName;
	}
	public void setAdmName(String admName) {
		this.admName = admName;
	}
	public String getAdmPwd() {
		return admPwd;
	}
	public void setAdmPwd(String admPwd) {
		this.admPwd = admPwd;
	}
	public String getAdmPhoto() {
		return admPhoto;
	}
	public void setAdmPhoto(String admPhoto) {
		this.admPhoto = admPhoto;
	}
	public Date getAdmTime() {
		return admTime;
	}
	public void setAdmTime(Date admTime) {
		this.admTime = admTime;
	}
	public Admins(Integer admid, String admName, String admPwd, String admPhoto, Date admTime) {
		super();
		this.admid = admid;
		this.admName = admName;
		this.admPwd = admPwd;
		this.admPhoto = admPhoto;
		this.admTime = admTime;
	}
	@Override
	public String toString() {
		return "Admins [admid=" + admid + ", admName=" + admName + ", admPwd=" + admPwd + ", admPhoto=" + admPhoto
				+ ", admTime=" + admTime + "]";
	}
	public Admins() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	

}
