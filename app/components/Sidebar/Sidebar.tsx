import React from "react";
import "./Sidebar.css"
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "@/lib/store";
import { Trash2, Plus } from "@deemlol/next-icons";
import { fetchPosts, setActivePostId } from "@/lib/features/main/mainSlice";
import { deletePost as deletePostAction } from "@/lib/features/main/mainSlice";

type SidebarProps = {
    sidebarMove: boolean;
    sidebarExpanded: () => void;
    sidebarReduce: () => void;
}


const Sidebar = ({ sidebarMove, sidebarExpanded, sidebarReduce, }: SidebarProps) => {

    //Redux
    const dispatch: AppDispatch = useDispatch();
    const posts = useSelector((state: RootState) => state.mainData.posts);

    const focusPost = async (id:string) => {

        dispatch(setActivePostId(id));

    }

    const addPost = async () => {

        const newPostData = {
            createNew: true,
        };

        const res = await fetch('/api/post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPostData),
        });

        const json = await res.json();
        if (res.ok) {
            console.log('New post created:', json.data);
        } else {
            console.error('Error creating post:', json.error);
        }

        dispatch(fetchPosts());

    }

    const deletePost = async (id: string) => {
        await dispatch(deletePostAction({ postId: id }));

        dispatch(fetchPosts());

    }

    return (
        <nav className={`navSidebar ${sidebarMove ? "sidebarExp" : "sidebar"}`}>
            <div className="sidebarContent">
                <div>
                    {
                        posts.map((post, index) => (

                            <div key={post.id} className='flex items-center gap-1'>
                                <Trash2
                                    onClick={()=> deletePost(post.id)}
                                    className='removeButton size-4'
                                />
                                <button
                                    key={post.id}
                                    onClick={()=>focusPost(post.id!)}
                                    onMouseOver={sidebarExpanded}
                                    onMouseOut={sidebarReduce}
                                    className="sidebarButton"
                                >
                                    {sidebarMove ? (
                                        <div className="flex items-center gap-2 ">
                                            <img
                                                src={post?.basicsData.imageUrl}
                                                alt="Custom Icon"
                                                className="size-12 border border-gray rounded-md"
                                            />
                                            <h1>{post.basicsData.name}</h1>
                                        </div>
                                    ) : (
                                        <img
                                            src={post.basicsData.imageUrl}
                                            alt="Custom Icon"
                                            className="size-12 rounded-md"
                                        />
                                    )
                                    }
                                </button></div>
                        )
                        )
                    }
                </div>

                <Plus
                    onClick={addPost}
                    className='addButton size-8'
                />

            </div>
        </nav>
    );
}

export default Sidebar;