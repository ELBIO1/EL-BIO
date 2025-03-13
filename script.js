const startCallButton = document.getElementById("startCall");
const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");

let localStream;
let peerConnection;

const configuration = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
};

startCallButton.addEventListener("click", async () => {
    try {
        // الحصول على الفيديو من كاميرا المستخدم
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideo.srcObject = localStream;

        // إنشاء اتصال WebRTC
        peerConnection = new RTCPeerConnection(configuration);

        // إضافة الفيديو المحلي إلى الاتصال
        localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

        // عند استقبال الفيديو من المستخدم الآخر
        peerConnection.ontrack = event => {
            remoteVideo.srcObject = event.streams[0];
        };

        // إنشاء عرض الاتصال
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        console.log("تم إنشاء الاتصال! أرسل هذا العرض إلى المستخدم الآخر:", offer);
    } catch (error) {
        console.error("خطأ أثناء بدء المكالمة:", error);
    }
});
