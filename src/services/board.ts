import axios from "axios";

class BoardService {  
  async register(userName:string, title: string, content: string) {
    return await axios.post("/api/board/post/register", {
      userName,
      title,
      content
    });
  }

  async getPosts() {
    return await axios.get("/api/board");
  }
  
  async delete(_id:string) {
    return await axios.delete(`/api/board/post/delete?postId=${_id}`);
  }
}

export default new BoardService();
