package com.ossp.cocktagorize.controller.apiController;

import com.google.api.gax.core.CredentialsProvider;
import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.texttospeech.v1.*;
import com.ossp.cocktagorize.data.dto.TTSRequestDto;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;


import java.io.ByteArrayInputStream;
import java.io.IOException;

@CrossOrigin
@RestController
@RequestMapping("/cocktail/{id}")
public class TTSApiController {

    private final HttpServletResponse response;

    @Autowired
    public TTSApiController(HttpServletResponse response) {
        this.response = response;
    }
    @PostMapping("/tts")
    public ResponseEntity<StreamingResponseBody> synthesizeTextToSpeech(@RequestBody TTSRequestDto requestDto, HttpServletResponse response) {
        try {
            // API 키 JSON 파일 내용
            String apiKeyJson =
                    "구글의apiKeyJson코드내용넣기";

            // API 키 JSON 파일 내용을 이용하여 ServiceAccountCredentials 생성
            GoogleCredentials credentials =
                    ServiceAccountCredentials.fromStream(new ByteArrayInputStream(apiKeyJson.getBytes()));

            TextToSpeechSettings settings =
                    TextToSpeechSettings.newBuilder().setCredentialsProvider(FixedCredentialsProvider.create(credentials)).build();

            // TextToSpeechClient 생성
            final TextToSpeechClient textToSpeechClient = TextToSpeechClient.create(settings);

            // TTS 요청 생성
            SynthesisInput input = SynthesisInput.newBuilder().setText(requestDto.getContent()).build();

            // TTS 목소리 설정
            VoiceSelectionParams voice =
                    VoiceSelectionParams.newBuilder()
                            .setLanguageCode("ko-KR")
                            .setSsmlGender(SsmlVoiceGender.FEMALE)
                            .build();

            // 음성 파라미터 설정
            AudioConfig audioConfig =
                    AudioConfig.newBuilder().setAudioEncoding(AudioEncoding.MP3).build();

            // TTS API 호출 및 스트리밍 응답 생성
            StreamingResponseBody responseBody = outputStream -> {
                SynthesizeSpeechResponse ttsResponse =
                        textToSpeechClient.synthesizeSpeech(input, voice, audioConfig);

                // 오디오 데이터 스트림을 출력 스트림으로 복사
                ttsResponse.getAudioContent().writeTo(outputStream);

                // 클라이언트로의 출력 완료 후 TextToSpeechClient 닫기
                textToSpeechClient.close();
            };

            // Content-Type 설정
            response.setContentType(MediaType.APPLICATION_OCTET_STREAM_VALUE);

            // 오디오 재생을 위한 Content-Disposition 헤더 설정
            String filename = "output.mp3";
            response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=\"" + filename + "\"");

            // 스트리밍 응답 반환
            return new ResponseEntity<>(responseBody, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

// 예시: http, script 코드
// <audio id="audioPlayer" controls></audio>
// <button id="playButton">Play</button>
//
//<button id="ttsButton">TTS 실행</button>
//
//<script>
// 버튼 클릭 이벤트 핸들러
//    document.getElementById('ttsButton').addEventListener('click', function() {
//            // 요청에 필요한 데이터
//            var requestData = {
//            // TTS 요청에 필요한 데이터를 입력
//            content: '칵테일 레시피'
//            };
//
//            // API 엔드포인트 URL
//            var apiUrl = '/cocktail/tts';
//
//            // API 요청
//            fetch(apiUrl, {
//            method: 'POST',
//            body: JSON.stringify(requestData),
//            headers: {
//            'Content-Type': 'application/json'
//            },
//            })
//            .then(function(response) {
//            if (response.ok) {
//            // 오디오 스트리밍 응답 처리
//            response.blob().then(function(blob) {
//            var audioUrl = URL.createObjectURL(blob);
//            var audio = new Audio(audioUrl);
//            audio.play();
//            });
//            } else {
//            console.error('TTS API 호출에 실패했습니다.');
//            }
//            })
//            .catch(function(error) {
//            console.error('TTS API 호출 중 오류가 발생했습니다.', error);
//            });
//            });
//      </script>


// JSON 파일을 사용하지 않고 아래처럼 api key로 실행
// test = http://localhost:8080/cocktail/tts?api_key=AIzaSyA_WPTDmspFu3uNtOvgs5sD2ZeL8NBZle8
//
//@RestController
//@RequestMapping("/cocktail")
//public class TTSApiController {
//
//    private static final String API_KEY_PARAM = "AIzaSyA_WPTDmspFu3uNtOvgs5sD2ZeL8NBZle8";
//
//    CredentialsProvider credentialsProvider;
//
//    public TTSApiController() {
//        credentialsProvider = null; // JSON 파일을 사용하지 않으므로 null로 설정
//    }
////    public TTSApiController() {
////        credentialsProvider = TextToSpeechClient::getDefaultChannelProvider;
////    }
//    @PostMapping("/tts")
//    public ResponseEntity<String> synthesizeTextToSpeech(@RequestParam("api_key") String apiKey, @RequestBody TTSRequestDto requestDto) {        // API 키 검증
//        if (!validateApiKey(apiKey)) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid API key.");
//        }
//
//        try (TextToSpeechClient textToSpeechClient = TextToSpeechClient.create()) {
//            SynthesisInput input = SynthesisInput.newBuilder().setText(requestDto.getContent()).build();
//            VoiceSelectionParams voice = VoiceSelectionParams.newBuilder()
//                    .setLanguageCode("ko-KR")
//                    .setSsmlGender(SsmlVoiceGender.FEMALE)
//                    .build();
//            AudioConfig audioConfig = AudioConfig.newBuilder().setAudioEncoding(AudioEncoding.MP3).build();
//            SynthesizeSpeechResponse response = textToSpeechClient.synthesizeSpeech(input, voice, audioConfig);
//            ByteString audioContents = response.getAudioContent();
//
//            playAudio(audioContents.toByteArray());
//
//            return ResponseEntity.ok("Text-to-speech synthesis completed.");
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during text-to-speech synthesis.");
//        }
//    }
//
//    private void playAudio(byte[] audioData) throws IOException, UnsupportedAudioFileException, LineUnavailableException {
//        File tempFile = File.createTempFile("temp", ".wav");
//
//        try (FileOutputStream fos = new FileOutputStream(tempFile)) {
//            fos.write(audioData);
//        }
//
//        File convertedFile = convertAudioFormat(tempFile);
//
//        AudioInputStream audioInputStream = AudioSystem.getAudioInputStream(convertedFile);
//        Clip clip = AudioSystem.getClip();
//        clip.open(audioInputStream);
//        clip.start();
//
//        while (clip.isRunning()) {
//            try {
//                Thread.sleep(100);
//            } catch (InterruptedException e) {
//                e.printStackTrace();
//            }
//        }
//
//        clip.close();
//        audioInputStream.close();
//
//        tempFile.delete();
//        convertedFile.delete();
//    }
//
//    private File convertAudioFormat(File inputFile) throws IOException, UnsupportedAudioFileException {
//        File outputFile = File.createTempFile("converted", ".wav");
//
//        AudioInputStream audioInputStream = AudioSystem.getAudioInputStream(inputFile);
//
//        AudioFormat sourceFormat = audioInputStream.getFormat();
//        AudioFormat targetFormat = new AudioFormat(
//                AudioFormat.Encoding.PCM_SIGNED,
//                sourceFormat.getSampleRate(),
//                16,
//                sourceFormat.getChannels(),
//                sourceFormat.getChannels() * 2,
//                sourceFormat.getSampleRate(),
//                false
//        );
//
//        try (AudioInputStream convertedInputStream = AudioSystem.getAudioInputStream(targetFormat, audioInputStream)) {
//            AudioSystem.write(convertedInputStream, AudioFileFormat.Type.WAVE, outputFile);
//        }
//
//        audioInputStream.close();
//
//        return outputFile;
//    }
//
//    private boolean validateApiKey(String apiKey) {
//        // ODO: API 키의 유효성 검사 로직 구현
//        // 예시: 특정 값이나 패턴을 가지고 있는지 확인
//        return apiKey != null && !apiKey.isEmpty();
//    }
//}


//package com.ossp.cocktagorize.controller.apiController;
//import com.google.auth.oauth2.GoogleCredentials;
//import com.google.auth.oauth2.ServiceAccountCredentials;
//import com.google.api.gax.core.CredentialsProvider;
//import com.google.api.gax.core.FixedCredentialsProvider;
//import com.google.cloud.texttospeech.v1.*;
//import com.google.protobuf.ByteString;
//import com.ossp.cocktagorize.data.dto.TTSRequestDto;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import javax.sound.sampled.*;
//import java.io.FileOutputStream;
//import java.io.IOException;
//import java.io.OutputStream;
//import java.nio.file.Files;
//import java.nio.file.Paths;
//
//
// JSON 파일을 사용하며 오디오 파일을 다운받고 해당 오다오 파일을 찾아서 재생하는 방식
//@RestController
//@RequestMapping("/cocktail")
//public class TTSApiController {
//
//    // JSON 파일로 저장된 key 파일 위치 입력
//    private static final String JSON_AUTH_KEY_PATH = "/Users/juhno1023/Desktop/공개SW/2023-1-OSSP2-NotEasy-10/feisty-mason-387506-e9f93d5a0231.json";
//
//    CredentialsProvider credentialsProvider;
//
//    public TTSApiController() {
//        try {
//            credentialsProvider = FixedCredentialsProvider.create(ServiceAccountCredentials.fromStream(Files.newInputStream(Paths.get(JSON_AUTH_KEY_PATH))));
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }
//
//    @PostMapping("/tts")
//    public ResponseEntity<String> synthesizeTextToSpeech(@RequestBody TTSRequestDto requestDto) {
//        // 계정 서비스 인증으로 Google cloud TTS 기능 설정
//        try (TextToSpeechClient textToSpeechClient = TextToSpeechClient.create(TextToSpeechSettings.newBuilder()
//                .setCredentialsProvider(credentialsProvider)
//                .build())) {
//            // 음성 변환할 텍스트를 선택 (requestDto로 받는 content를 선택)
//            SynthesisInput input = SynthesisInput.newBuilder().setText(requestDto.getContent()).build();
//
//            // 음성 요청을 만듬, 언어 선택 = ("ko-KR"), 음성 성별 = ("neutral")
//            VoiceSelectionParams voice = VoiceSelectionParams.newBuilder()
//                    .setLanguageCode("ko-KR")
//                    .setSsmlGender(SsmlVoiceGender.FEMALE)
//                    .build();
//
//            // 반환하고 싶은 음성 타입을 설정
//            AudioConfig audioConfig = AudioConfig.newBuilder().setAudioEncoding(AudioEncoding.MP3).build();
//
//            // 선택된 보이스 설정과 출력 파일 설정으로 텍스트 - 음성 파일 변환을 진행함
//            SynthesizeSpeechResponse response = textToSpeechClient.synthesizeSpeech(input, voice, audioConfig);
//
//            // 응답으로부터 오디오 파일 얻음
//            ByteString audioContents = response.getAudioContent();
//
//            // output file에 응답 작성
//            try (OutputStream out = new FileOutputStream("output.mp3")) {
//                out.write(audioContents.toByteArray());
//                System.out.println("Audio content written to file \"output.mp3\"");
//            }
//
//            // 오디오 재생
//            playAudio("output.mp3");
//
//            return ResponseEntity.ok("Text-to-speech synthesis completed.");
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during text-to-speech synthesis.");
//        }
//    }
//
//    private void playAudio(String filePath) throws IOException, UnsupportedAudioFileException, LineUnavailableException {
//        AudioInputStream audioInputStream = AudioSystem.getAudioInputStream(Paths.get(filePath).toFile());
//        Clip clip = AudioSystem.getClip();
//        clip.open(audioInputStream);
//        clip.start();
//
//        // 오디오 재생이 끝날때 까지 기다림
//        while (clip.isRunning()) {
//            try {
//                Thread.sleep(100);
//            } catch (InterruptedException e) {
//                e.printStackTrace();
//            }
//        }
//
//        clip.close();
//        audioInputStream.close();
//    }
//}
