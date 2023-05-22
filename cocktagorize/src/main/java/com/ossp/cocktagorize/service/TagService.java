package com.ossp.cocktagorize.service;

import com.ossp.cocktagorize.data.dto.TagDto;
import com.ossp.cocktagorize.data.entity.Tag;
import com.ossp.cocktagorize.data.repository.TagRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TagService {
    @Autowired
    private TagRepository tagRepository;

    @Transactional
    public List<TagDto> getTagList(){
        List<Tag> taglist=tagRepository.findAll();
        List<TagDto> TagDtoList=new ArrayList<>();
        for(Tag tag:taglist){
            TagDtoList.add(new TagDto(tag));
        }
        return TagDtoList;
    }
}
