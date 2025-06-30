import PostForm from "@/components/post/post-form";
import { Card, CardContent, CardHeader, CardTitle} from "../../../components/ui/card"

function CreatePostPage(){
    return(
        <main className="py-5">
            <div className="max-w-4xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-4xl font-bold">
                            Create a New Post
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PostForm title={""} description={""} content={""} />
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}

export default CreatePostPage;