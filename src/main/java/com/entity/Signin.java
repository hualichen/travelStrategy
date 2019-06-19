package com.entity;

import java.io.Serializable;
import java.util.Date;

//签到表
public class Signin implements Serializable{
	private Integer siid;
	private Integer usid;
	private Integer siState;
	private Date siTime;
	private Integer siNum;
	
	
	
	public Signin() {
		super();
	}
	public Signin(Integer siid, Integer usid, Integer siState, Date siTime, Integer siNum) {
		super();
		this.siid = siid;
		this.usid = usid;
		this.siState = siState;
		this.siTime = siTime;
		this.siNum = siNum;
	}
	public Integer getSiid() {
		return siid;
	}
	public void setSiid(Integer siid) {
		this.siid = siid;
	}
	public Integer getUsid() {
		return usid;
	}
	public void setUsid(Integer usid) {
		this.usid = usid;
	}
	public Integer getSiState() {
		return siState;
	}
	public void setSiState(Integer siState) {
		this.siState = siState;
	}
	public Date getSiTime() {
		return siTime;
	}
	public void setSiTime(Date siTime) {
		this.siTime = siTime;
	}
	public Integer getSiNum() {
		return siNum;
	}
	public void setSiNum(Integer siNum) {
		this.siNum = siNum;
	}
	@Override
	public String toString() {
		return "Signin [siid=" + siid + ", usid=" + usid + ", siState=" + siState + ", siTime=" + siTime + ", siNum="
				+ siNum + "]";
	}
}
