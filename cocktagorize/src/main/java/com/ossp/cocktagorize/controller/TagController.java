package com.ossp.cocktagorize.controller;

import com.ossp.cocktagorize.data.dto.TagDto;
import com.ossp.cocktagorize.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Controller
@CrossOrigin
@RestController
public class TagController {
    @Autowired
    private TagService tagService;

    @GetMapping("/tag/all")
    @ResponseBody
    @CrossOrigin
    public ResponseEntity<List<TagDto>> getTagList(){
        List<TagDto> tagList=tagService.getTagList();
        return ResponseEntity.ok(tagList);
    }
}
