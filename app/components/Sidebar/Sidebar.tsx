import React from "react";
import "./Sidebar.css"
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "@/lib/store";
import { Trash2, Plus } from "@deemlol/next-icons";
import { createPost, readPosts, setActivePostId } from "@/lib/features/main/mainSlice";
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

    const handleFocusPost = async (id: string) => {

        dispatch(setActivePostId(id));
    }

    const handleAddPost = async () => {

        dispatch(createPost());
        await new Promise(res => setTimeout(res, 1000)); 
        dispatch(readPosts());
    }

    const handleDeletePost = async (id: string) => {

        await dispatch(deletePostAction({ postId: id }));
        dispatch(readPosts());
    }

    return (
        <nav className={`navSidebar ${sidebarMove ? "sidebarExp" : "sidebar"}`}>
            <div className="sidebarContent">
                <div>
                    {
                        posts.map((post, index) => (

                            <div key={post.id} className='flex items-center gap-1'>
                                <Trash2
                                    onClick={() => handleDeletePost(post.id)}
                                    className='removeButton size-4'
                                />
                                <button
                                    key={post.id}
                                    onClick={() => handleFocusPost(post.id!)}
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
                    onClick={handleAddPost}
                    className='addButton size-8'
                />

            </div>
        </nav>
    );
}

export default Sidebar;