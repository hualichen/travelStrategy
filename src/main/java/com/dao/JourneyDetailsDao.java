package com.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.entity.JourneyDetails;

@Mapper
public interface JourneyDetailsDao {
	
	int addjoid(int joid);
	//添加
	
	//按行程id查询
	@Select(" select *  from JourneyDetails where joid=#{joid}")
	List<JourneyDetails>  queryjoid(int joid);
	
	// 按详情id查询
	@Select(" select *  from JourneyDetails where jdid=#{jdid}")
	JourneyDetails  queryjdid(int jdid);
	
	int add(JourneyDetails j);
	
	//按行程id修改
	@Update("UPDATE journeydetails" + 
			"	SET  scid=#{scid}, describes=#{describes}, scenicimg=#{scenicimg}, tickets=#{tickets}, catering=#{catering}, foodimgs=#{foodimgs}, stay=#{stay}, traffic=#{traffic}, day=#{day}, path=#{path}" + 
			"	WHERE jdid=#{jdid}")
	int update(JourneyDetails j);
	
}
