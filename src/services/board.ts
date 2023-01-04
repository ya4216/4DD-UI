import axios from "axios";

interface CommentForm {
  post_id: string;
  userName: string;
  content: string;
  comment_level : number;
  comment_id?: string;
  parents_comment_id?: string;
}

class BoardService {  
  async register(_id: string, userName:string, title: string, content: string) {
    return await axios[_id ? 'put' : 'post']("/api/board/post/"+ (_id ? `update?postId=${_id}` : "register"), {
      userName,
      title,
      content
    });
  }
  async addComment(commentForm: CommentForm) {
    return await axios[commentForm.comment_id ? 'put' : 'post']("/api/board/comment/"+ (commentForm.comment_id ? `update?commentId=${commentForm.comment_id}` : "register"),
      commentForm
    );
  }

  async getPosts() {
    return await axios.get("/api/board");
  }

  async getComments(post_id: string) {
    return await axios.get(`/api/board/comment/${post_id}`);
  }
  
  async delete(_id:string) {
    return await axios.delete(`/api/board/post/delete?postId=${_id}`);
  }

  async deleteComment(_id:string) {
    return await axios.delete(`/api/board/comment/delete?commentId=${_id}`);
  }
}

export default new BoardService();
