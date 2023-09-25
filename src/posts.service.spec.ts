import { Post, PostsService } from "./posts.service";

describe("PostsService", () => {
  let postsService: PostsService;
  const post: Omit<Post, "id" | "date"> = {
    text: "Mocked post",
  };

  beforeEach(async () => {
    postsService = new PostsService();

    postsService.create({ text: "Some pre-existing post" });
  });

  it("should add a new post", () => {
    const newPost = postsService.create(post);
    const { id } = newPost;

    expect(newPost.text).toEqual(post.text);

    expect(id).toBeDefined();
  });

  it("should find a post", () => {
    const response = postsService.create(post);
    const { id } = response;

    const postFromDb = postsService.find(id);
    expect(postFromDb).toBeDefined();

    expect(postFromDb?.text).toEqual(response.text);
  });
});
