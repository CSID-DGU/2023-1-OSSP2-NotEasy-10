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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;


import java.io.ByteArrayInputStream;
import java.io.IOException;

@RestController
@RequestMapping("/cocktail")
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
            String apiKeyJson = "{\n" +
                    "  \"type\": \"service_account\",\n" +
                    "  \"project_id\": \"feisty-mason-387506\",\n" +
                    "  \"private_key_id\": \"e9f93d5a02317fdfc4ee26d543ea1d661476d9ff\",\n" +
                    "  \"private_key\": \"-----BEGIN PRIVATE KEY-----\\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC+/SL/UlSgbraf\\n1/b/BkGZlinFQ2fJ+ix5ukRxeIkUFr6YGbx6jllmp/05LobtvH/LcumYqglpzGLE\\n/8gPJt8y5Ep1Veh4xCjzgcbcr/E4bi0P7itUzKAn3zdMMLdO9aXhI8MvE2zttt3d\\ncaU6in8nb8KZoSHS+6AYN7+U+9ytBYSWZlJi/XTNn34Behclm7vYVKKMQ6CorE2K\\nphNu4DF69f/L6/dZtUZ0mvFexLqFM0dJdvTwFR6seJqALmLacFRy7kz7UoUgAK1i\\nD76ZE5+aPQ97FolouEgCO0xfEuHX2f3piZ2N+GmZZzjZzzTuoUoHtaDRH4sUESJf\\nuWGETerLAgMBAAECggEAJ07xU4xt54Ex7C8mYnG2sbYyzatkYrEvUzRvns0YpX5S\\n5voxDSZcJyE/IHQ/iBGqWcTCaE3i1xgeYf5k/h1Zhd9vpbuzN5vj885LkCNUKfGf\\nK66w02i0M9Cg0HkcWU98vxw9sWQ1oK1o94lK4QQdTJAXhMghrotkdWeP8kluL1ve\\nqGF4AyAd9nBqfThM6mlDU/X1PMfkcBu8xtKLnW6mB7Z12Pwx13i/TlZt1UaQsuDp\\nkcpIwnJLONwnV2XdtxU1qqX0366i80kiCd6hq13Mugv2CbH/4BNzzfhHODgpKUpX\\ndNugqzxoKSz3zlgARvbwniQ3klPFHpDimlh83C+bEQKBgQDsPy+oNagLcNC3dqBq\\n6z7zUyKR39UdZE2DQn3pfmUpnjZAr/OYj3qbAnTxwLESxCfdmuWb7Hyl9k6I9mBX\\nVE2UmLX94pe92NKKuYW/39SgKIQcRlfluXtP2CwTVczUDe6BT3eJNkj/9sq38uye\\n3qT4rs8e/xOmwb1oFoecK17rUQKBgQDO9TZfY1YX2Jn1P1iG1cd13xW04GAHDHRV\\naq7tI+FsgHQkWr4sjvvwO/CH8z9fy7feH+A+Ngzz5vZHtpd3578wjZ4rZ1m3dd4H\\nHp1ON74Za4qLYLMbtQVEldJG94o4PItVcbDgmTf9CPkLzeI+BNc7IXJQFbg0VMtU\\nuWW2fjC1WwKBgEJGI4drrf2vo02kYLI91kYKb2s+wJljNv94mrvy8kwvjwaslYiZ\\nz4pGsSnUpZgfIRPgzULln74rD7MKctJs2uqxwHQ9qdXfSokSLHw8PXjEhPMtpKDU\\nXMx0V0EBU9m1ItBxy5XZfbcYs5vQ8SJMUTlWSNJoOkoQlaLqlxZvcExRAoGBAL0e\\nd0FTlSjVVls2N79/O3YLFdrj7tyCFQy5IICzeRudhoRyJ7awMqmlHHgfYJo5nxvs\\nJQ60dcGsHQILaP65V40W3KLtHp73ppz67OS9K4ovK7uR8hovoVC7WBxhuH0LVogO\\nDIQxf2hK+so+qa/i3Iu8VKm6L0oi8mvJv5i0V+5hAoGBAJU/RAOm6KaABUK2/6jC\\nTtfIQ8Fuc4+BOuffuwhy1xcSGzmPlH7bJodp0XBjw1SezMD0sUwY2jZj98aJ9Qj3\\nNao/Wq0KElJ9427JyuJy1+S8Aa+kutHx9jEKDUXwS2g0q3Xs57avSbnVltRVDlii\\nxxL0cvofQic0urikSaMzNsJg\\n-----END PRIVATE KEY-----\\n\",\n" +
                    "  \"client_email\": \"hyeondnr@feisty-mason-387506.iam.gserviceaccount.com\",\n" +
                    "  \"client_id\": \"101605650079029343851\",\n" +
                    "  \"auth_uri\": \"https://accounts.google.com/o/oauth2/auth\",\n" +
                    "  \"token_uri\": \"https://oauth2.googleapis.com/token\",\n" +
                    "  \"auth_provider_x509_cert_url\": \"https://www.googleapis.com/oauth2/v1/certs\",\n" +
                    "  \"client_x509_cert_url\": \"https://www.googleapis.com/robot/v1/metadata/x509/hyeondnr%40feisty-mason-387506.iam.gserviceaccount.com\",\n" +
                    "  \"universe_domain\": \"googleapis.com\"\n" +
                    "}\n";

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
// <script>
//  document.getElementById('playButton').addEventListener('click', function() {
//    var audioPlayer = document.getElementById('audioPlayer');
//    var audioUrl = '/api/tts'; // TTS 컨트롤러의 URL
//    fetch(audioUrl)
//      .then(function(response) {
//        return response.blob();
//      })
//      .then(function(blob) {
//        var audioUrl = URL.createObjectURL(blob);
//        audioPlayer.src = audioUrl;
//        audioPlayer.play();
//      });
//  });
//</script>
//위의 예시 코드는 클라이언트에서 TTS 컨트롤러의 URL(/api/tts)을 호출하여 오디오 스트림을 받아오고,
//그 후에 <audio> 요소의 src에 설정하여 오디오를 재생합니다. 클라이언트의 버튼 클릭 이벤트 핸들러에서 fetch() 함수를 사용하여 오디오 스트림을 받아온 다음, blob() 메서드를 통해 Blob 객체로 변환하고, 이를 <audio> 요소의 src에 설정하여 재생합니다.
//이렇게 구현하면 클라이언트가 버튼을 클릭하여 컨트롤러를 호출하면, 웹사이트에서 소리가 재생됩니다.


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
