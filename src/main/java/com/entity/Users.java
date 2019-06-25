package com.entity;

import java.io.Serializable;

public class Users implements Serializable{
	private Integer usid;//编号
	private String usName;//姓名
	private String usPwd;//密码
	private String usPhone;//手机号
	private String usSex;//性别
	private String usPhoto;//头像
	private String usArea;//地区
	private String usIntro;//简介
	private String usBgImg;//背景照片
	private Integer usState;//状态
	
	private Signin signin;//签到
	
	public Integer getUsid() {
		return usid;
	}
	public void setUsid(Integer usid) {
		this.usid = usid;
	}
	public String getUsName() {
		return usName;
	}
	public void setUsName(String usName) {
		this.usName = usName;
	}
	public String getUsPwd() {
		return usPwd;
	}
	public void setUsPwd(String usPwd) {
		this.usPwd = usPwd;
	}
	public String getUsPhone() {
		return usPhone;
	}
	public void setUsPhone(String usPhone) {
		this.usPhone = usPhone;
	}
	public String getUsSex() {
		return usSex;
	}
	public void setUsSex(String usSex) {
		this.usSex = usSex;
	}
	public String getUsPhoto() {
		return usPhoto;
	}
	public void setUsPhoto(String usPhoto) {
		this.usPhoto = usPhoto;
	}
	public String getUsArea() {
		return usArea;
	}
	public void setUsArea(String usArea) {
		this.usArea = usArea;
	}
	public String getUsIntro() {
		return usIntro;
	}
	public void setUsIntro(String usIntro) {
		this.usIntro = usIntro;
	}
	public String getUsBgImg() {
		return usBgImg;
	}
	public void setUsBgImg(String usBgImg) {
		this.usBgImg = usBgImg;
	}
	public Integer getUsState() {
		return usState;
	}
	public void setUsState(Integer usState) {
		this.usState = usState;
	}
	public Signin getSignin() {
		return signin;
	}
	public void setSignin(Signin signin) {
		this.signin = signin;
	}
	@Override
	public String toString() {
		return "Users [usid=" + usid + ", usName=" + usName + ", usPwd=" + usPwd + ", usPhone=" + usPhone + ", usSex="
				+ usSex + ", usPhoto=" + usPhoto + ", usArea=" + usArea + ", usIntro=" + usIntro + ", usBgImg="
				+ usBgImg + ", usState=" + usState + ", signin=" + signin + "]";
	}
	
}
