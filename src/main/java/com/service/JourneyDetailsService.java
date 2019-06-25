package com.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.dao.JourneyDetailsDao;
import com.entity.JourneyDetails;

@Service
public class JourneyDetailsService {
	@Resource
	JourneyDetailsDao journeyDetailsDao;
	
	public  int addjoid(int joid) {
		return journeyDetailsDao.addjoid(joid);
	}
	public  List<JourneyDetails> queryjoid(int joid) {
		return journeyDetailsDao.queryjoid(joid);
	}
	public  JourneyDetails queryjdid(int jdid) {
		return journeyDetailsDao.queryjdid(jdid);
	}
	public int update(JourneyDetails j) {
		return journeyDetailsDao.update(j);
	}
}
