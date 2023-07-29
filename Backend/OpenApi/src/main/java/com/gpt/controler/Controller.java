package com.gpt.controler;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gpt.controler.model.ChatMessagePrompt;
import com.theokanning.openai.completion.CompletionRequest;
import com.theokanning.openai.completion.CompletionResult;
import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.service.OpenAiService;



	
	
//openai.model=gpt-3.5-turbo-0613
//	openai.api.key=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
//			openai.api.url=https://api.openai.com/v1/chat/completions
	@RestController
	public class Controller {
		

//		@GetMapping("/getchat/{prompt}")
//		public String getPrompt(@PathVariable String prompt){
//			OpenAiService service=new OpenAiService("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");
//			CompletionRequest compl=CompletionRequest.builder().prompt(prompt).model("text-davinci-003").echo(true).build();
//			return service.createCompletion(compl).getChoices().get(0).getText();
//		}
		
		
		
		@PostMapping("/chat")
		public String getMessage(@RequestBody ChatMessagePrompt prompt){
			OpenAiService service=new OpenAiService("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");
			ChatCompletionRequest compl=ChatCompletionRequest.builder().messages(prompt.getChatMessage()).model("gpt-3.5-turbo-16k-0613").build();
			return service.createChatCompletion(compl).getChoices().get(0).getMessage().getContent();
		}
	}

	
	
	

