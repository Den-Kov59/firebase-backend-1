import dgram from "dgram";

export class UdpClient {
  private static instance: UdpClient;
    private client: dgram.Socket;
    private serviceHost = "localhost";
    private servicePort = 3001;

  private constructor() {
    this.client = dgram.createSocket("udp4");
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new UdpClient();
    }
    return this.instance;
    }
    
    public sendUdpMessageToService(message: string) {
        this.client.send(message, 0, message.length, this.servicePort, this.serviceHost, (err) => {
            if (err) {
              console.error(`UDP message send error: ${err.message}`);
            } else {
              console.log("UDP message sent to server");
            }
        })
    }
}
