//해시 하기 위해 노드JS의 크립토 사용
import crypto from "crypto";

//인터페이스로 BlockShape 객체 타입 설정
interface BlockShape {
  hash: string;
  prevHash: string; //이전 해쉬 값
  height: number; //1,2,3,4... 같이 블록의 위치를 표시해주는 숫자
  data: string; // 보호할 데이터
}

//1. Block 클래스 만들기
class Block implements BlockShape {
  //타입 명시
  public hash: string;
  //블록 생성하기
  //1-1. 생성자 메서드 constructor()로 블록의 기본 상태 설정하기
  constructor(
    public prevHash: string,
    public height: number,
    public data: string
  ) {
    //hash 변수 초기화
    this.hash = Block.calculateHash(prevHash, height, data);
  }

  //1-2. Block 객체에 포함되는 메서드 생성하기
  //static 메서드는 클래스 안에서 사용하는 메서드로 클래스 인스턴스가 없어도 부를 수 있다.
  static calculateHash(prevHash: string, height: number, data: string) {
    //데이터 해쉬값 생성하기
    const toHash = `${prevHash}${height}${data}`;
    //크립토로 toHash 해시하여 반환하기
    return crypto.createHash("sha256").update(toHash).digest("hex");
  }
}

//2. BlockChain 클래스(=블락 모은거) 생성하기
class BlockChain {
  //타입 명시
  private blocks: Block[]; //Block 클래스의 배열

  //2-1. constructor() 메서드로 BlockChain 객체의 기본 상태 설정하기
  constructor() {
    //BlockChain.blocks 속성은 배열인데, 이 배열에 Block들을 담을 예정
    this.blocks = [];
    //클래스 생성자 파라미터는 일단 비워두기
  }

  ///////////////////////////////////////
  //2-2. BlockChain 객체에 속한 메서드들

  //이전 해쉬값 불러오는 pirvate 함수
  private getPrevHash() {
    //blocks의 길이가 0이라면, 즉 블록체인에 아무것도 없다면 이전 해시 값이 없으므로 "" 리턴
    if (this.blocks.length === 0) return "";
    return this.blocks[this.blocks.length - 1].hash;
    //blocks에 뭔가 있다면 `마지막 블럭의 해쉬(hash)값(배열은 0부터 시작이니 -1 해주면 됨)` 리턴
  }

  //새로운 블록을 추가할 때, 블록에 저장하고 싶은 데이터 보내줘야함
  public addBlock(data: string) {
    //새로운 블록 생성하기
    const newBlock = new Block(
      this.getPrevHash(), //이전 해시값
      this.blocks.length + 1, //height 값
      data // data 값
    );

    //생성한 블럭 넣기
    this.blocks.push(newBlock);
  }

  //블록에 접근하는 public 함수
  public getBlocks() {
    return [...this.blocks];
  }
  ///////////////////////////////////////
}

//2-3. BlockChain 클래스의 인스턴스 생성하기
const blockchain = new BlockChain();

//2-4. BlockChain 클래스의 인스턴스에서 메서드 사용하여 새로운 블럭 추가하기
blockchain.addBlock("1 block");
blockchain.addBlock("2 block");
blockchain.addBlock("3 block");
blockchain.addBlock("4 block");

blockchain.getBlocks().push(new Block("zzz", 112, "너해킹당함ㅋ"));

//2-5. 블럭체인이 가진 블럭 get하는 메서드 사용하여 어떤 블럭 있는지 보기
console.log(blockchain.getBlocks());
