package com.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.dao.JourneyDao;
import com.entity.Journey;

@Service
public class JourneyService  {
	@Resource
	JourneyDao dao;
		
	public int add1(Journey journey) {
		return dao.add1(journey);
	}
	
}
