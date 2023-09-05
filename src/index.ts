//해시 하기 위해 노드JS의 크립토 사용
import crypto from "crypto";

interface BlockShape {
  hash: string;
  prevHash: string; //이전 해쉬 값
  height: number; //1,2,3,4... 같이 블록의 위치를 표시해주는 숫자
  data: string; // 보호할 데이터
}

class Block implements BlockShape {
  public hash: string;
  //블록 생성하기
  constructor(
    public prevHash: string,
    public height: number,
    public data: string
  ) {
    //hash 변수 초기화
    this.hash = Block.calculateHash(prevHash, height, data);
  }
  //static 메서드는 클래스 안에서 사용하는 메서드로 클래스 인스턴스가 없어도 부를 수 있다.
  static calculateHash(prevHash: string, height: number, data: string) {
    //데이터 해쉬값 생성하기
    const toHash = `${prevHash}${height}${data}`;
    //크립토로 toHash 해시하여 반환하기
    return crypto.createHash("sha256").update(toHash).digest("hex");
  }
}
