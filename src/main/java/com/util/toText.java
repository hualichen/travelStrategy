package com.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class toText {
		//参数string为你的文件名
	public static String readFileContent(String fileName) throws IOException {
		File file = new File(fileName);

		BufferedReader bf = new BufferedReader(new FileReader(file));

		String content = "";
		StringBuilder sb = new StringBuilder();

		while(content != null){
		content = bf.readLine();

		if(content == null){
		break;
		}

		sb.append(content.trim());
		}

		bf.close();
		System.out.println("++++++++++++++++++++++++");
		System.out.println(sb.toString());
		return sb.toString();
	}

}
