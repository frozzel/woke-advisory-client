import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsTrash, BsPencilSquare } from "react-icons/bs";
import { useAuth, useNotification } from "../../hooks";
import Container from "../Container";
import ConfirmModal from "../models/ConfirmModal";
import NotFoundText from "../NotFoundText";
import EditRatingModalSchool from "../models/EditRatingModalSchool";
import {Link} from "react-router-dom"
import { getAlertsSchool, deleteReview, addComment } from "../../api/post";
import AddPostModal from "../models/AddPostModal";
import { useNavigate } from "react-router-dom";
import {FaHeart, FaRegHeart, FaRegComment} from "react-icons/fa"
import {RiDeleteBack2Line} from "react-icons/ri"
import PostCommentForm from "../form/PostCommentForm";
import { likeAlert } from "../../api/post";
import io from 'socket.io-client';
import {TbMessage2Plus} from "react-icons/tb"
import {IoAlert} from "react-icons/io5"

const socket = io(process.env.REACT_APP_API3);

const getNameInitial = (name = "") => {
  return name[0].toUpperCase();
};

export default function Feed() {
  const [reviews, setReviews] = useState([]);
  const [profileOwnersReview, setProfileOwnersReview] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [busy, setBusy] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [following, setFollowing] = useState([]);
  const [schoolsFollowing, setSchoolsFollowing] = useState([]);
  const [teachersFollowing, setTeachersFollowing] = useState([]);
  const allAlerts = [...following, ...schoolsFollowing, ...teachersFollowing];
  
  const { userId } = useParams();
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;
  const navigate = useNavigate();
  const { profile } = authInfo;
  
  const { updateNotification } = useNotification();



  const fetchReviews = async () => {
    const { alerts, error, following, schoolsFollowing, teachersFollowing } = await getAlertsSchool(userId);
    
    if (error) return console.log("Reviews Error:", error);
    setReviews([...alerts]);
    setFollowing([...following]);
    setSchoolsFollowing([...schoolsFollowing]);
    setTeachersFollowing([...teachersFollowing]);
    
  };

  const handleOnEditClick = () => {
    const { id, content, rating} = profileOwnersReview;
    
    setSelectedReview({
      id,
      content,
      rating,
    });
    
    setShowEditModal(true);
  };
  
  const handleDeleteConfirm = async () => {
    setBusy(true);
    const { error, message } = await deleteReview(profileOwnersReview.id);
    setBusy(false);
    if (error) return updateNotification("error", error);

    updateNotification("success", message);

    const updatedReviews = reviews.filter(
      (r) => r.id !== profileOwnersReview.id
    );
    setReviews([...updatedReviews]);
    setProfileOwnersReview(null);
    hideConfirmModal();
  };

  const handleOnReviewUpdate = (review) => {
    const updatedReview = {
      ...profileOwnersReview,
      rating: review.rating,
      content: review.content,
      // CRT: review.CRT,
    };

    setProfileOwnersReview({ ...updatedReview });

    const newReviews = reviews.map((r) => {
      if (r.id === updatedReview.id) return updatedReview;
      return r;
    });

    setReviews([...newReviews]);
  };

  const displayConfirmModal = () => setShowConfirmModal(true);
  const hideConfirmModal = () => setShowConfirmModal(false);
  const hideEditModal = () => {
    setShowEditModal(false);
    setSelectedReview(null);
  };
  const handleAddTeacher = () => {
    if (!isLoggedIn) return navigate("/auth/signIn");
    setShowAddModal(true);
  };

  const hideRatingModal = () => {
    setShowAddModal(false);
    };

const handleOnRatingSuccess = (pass) => {
        socket.emit('room', userId, pass);
        
    };

  useEffect(() => {
    if (userId) fetchReviews();
  }, [userId]);


  useEffect(() => {
    socket.emit('room', userId);
    socket.on('msg', (pass) => {
      if(!pass) return;
      setReviews(() => [pass, ...reviews]);
    });
  }, [reviews]);

  useEffect(() => {
    socket.emit('room', allAlerts);
    socket.on('msg', (pass) => {
      if(!pass) return;
      setReviews(() => [pass, ...reviews]);
    });
  }, [following]);

  

  useEffect(() => {
    socket.emit('roomDelete', userId);
    socket.on('delete', (pass) => {
      if(!pass) return;
      const alerts = reviews.filter((r) => r._id !== pass._id);
      setReviews([...alerts]);
    });
  }, [reviews]);


  if (!isLoggedIn) {
    return (<>
      <div className="h-screen flex justify-center items-center dark:bg-primary bg-white ">
      <p className="text-light-subtle dark:text-dark-subtle animate-pulse">
      Please Login
      </p>
    </div>
    </>
    )
}
  if (profile.id !== userId) {
    return (<>
      <div className="h-screen flex justify-center items-center dark:bg-primary bg-white ">
      <p className="text-light-subtle dark:text-dark-subtle animate-pulse">
      You are not authorized to view this page
      </p>
    </div>
    </>
    )
}
  if (profile.id === userId) 
  return (<>
    <AddPostModal visible={showAddModal} onClose={hideRatingModal} onSuccess={handleOnRatingSuccess} />

    <div className="dark:bg-primary bg-white  pb-10">
      <Container className="xl:px-0  py-1">
        <div className="mb-2 text-left  ">
          { isLoggedIn ? (  <button onClick={handleAddTeacher}
                className=" mt-3 ml-2 bg-transparent text-2xl hover:text-good hover:dark:text-good transition text-light-subtle dark:text-dark-subtle "
                type="button"><TbMessage2Plus/></button>
          ) : null

          }
    
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold dark:text-white text-secondary md:text-xl lg:text-2xl sm:text-[10px] whitespace-nowrap">
            <span className="text-light-subtle dark:text-dark-subtle font-normal" >
              {/* Alerts:     */}
            </span>{"    "}{" "}
        
          </h1>

          
            
        </div>

        <NotFoundText text="No Alerts!" visible={!reviews.length} />

        {profileOwnersReview ? (
          <div>
            {profileOwnersReview.map((review) => (<>
                <ReviewCard review={review} key={review._id} />
                <div className="flex space-x-3 dark:text-white text-primary text-xl p-3">
                <button onClick={displayConfirmModal} type="button">
                  <BsTrash />
                </button>
                <button onClick={handleOnEditClick} type="button">
                  <BsPencilSquare />
                </button>
              </div></>
                ))}
            

          </div>
        ) : (
          <div className=" space-y-3  mt-3">
            {reviews.map((review) => (
              <ReviewCard review={review} key={review._id} />
            ))}
          </div>
        )}
      </Container>

      <ConfirmModal
        visible={showConfirmModal}
        onCancel={hideConfirmModal}
        onConfirm={handleDeleteConfirm}
        busy={busy}
        title="Are you sure?"
        subtitle="This action will remove this review permanently."
      />

      <EditRatingModalSchool
        visible={showEditModal}
        initialState={selectedReview}
        onSuccess={handleOnReviewUpdate}
        onClose={hideEditModal}
      />
    </div></>
  );
}

const ReviewCard = ({ review, }) => {
  const { owner, content, image, createdAt, school, teacher } = review;
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [busy, setBusy] = useState(false);
  const { authInfo } = useAuth();
  const profileId = authInfo.profile?.id;
  const { isLoggedIn } = authInfo;
  const navigate = useNavigate();
  const { updateNotification } = useNotification();
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(review.comments);
  const [likes, setLikes] = useState(review.likes);
  const [liked, setLiked] = useState(review.likes.filter((like) => like.user._id === profileId).length > 0);
  const alertId = review._id;
  const [path, setPath] = useState('post');

  const checkPath = (query) => {
  if (school !== undefined) {
    setPath('alertsSchool');
    handleSearchSubmit(query);
  }
  else if (teacher !== undefined ) {
      setPath('alertsTeacher');
      handleSearchSubmit(query);
  } else {
      setPath('post');
      handleSearchSubmit(query);
  }
  }
  
  
  
  const handleDeleteConfirm = async () => {
    await checkPath();
    setBusy(true);
    const { error, alerts, message } = await deleteReview(review._id, path);
    setBusy(false);
    if (error) return updateNotification("error", error);
    socket.emit('roomDelete', owner._id, alerts);
    updateNotification("success", message);
    hideConfirmModal();
  };

  const handleSearchSubmit = async (query, path) => {
    if (!isLoggedIn) return navigate("/auth/signIn");
    const content = {
      content: query
    };
    
    const { error, alert } = await addComment(alertId, content, path);
    if (error) return updateNotification("error", error);
    updateNotification("success", "Comment added successfully!");
    socket.emit('roomComment', alertId, alert);
    setShowComments(true);
    
  };

  const displayConfirmModal = () => setShowConfirmModal(true);
  const hideConfirmModal = () => setShowConfirmModal(false);

  const displayComments = () => { 
    if(showComments) setShowComments(false)
    else setShowComments(true) };

  

  const addLikeSchool = async () => {
    if (!isLoggedIn) return navigate("/auth/signIn");
    const path = 'alertsSchool';
    const { error, alert } = await likeAlert(alertId, path);
    if (error) return updateNotification("error", error);
    updateNotification("success", "Like added successfully!"); 
    socket.emit('roomLike', alertId, alert);

    const test =  alert.likes.filter((like) => like.user._id === profileId);
      
    if (test.length === 1 ) setLiked(true);
    else setLiked(false);
    
  };
  const addLikeTeacher = async () => {
    if (!isLoggedIn) return navigate("/auth/signIn");
    const path = 'alertsTeacher';
    const { error, alert } = await likeAlert(alertId, path);
    if (error) return updateNotification("error", error);
    updateNotification("success", "Like added successfully!"); 
    socket.emit('roomLike', alertId, alert);

    const test =  alert.likes.filter((like) => like.user._id === profileId);
      
    if (test.length === 1 ) setLiked(true);
    else setLiked(false);
    
  };
  const addLike = async () => {
    if (!isLoggedIn) return navigate("/auth/signIn");
    const path = 'post';
    const { error, alert } = await likeAlert(alertId, path);
    if (error) return updateNotification("error", error);
    updateNotification("success", "Like added successfully!"); 
    socket.emit('roomLike', alertId, alert);

    const test =  alert.likes.filter((like) => like.user._id === profileId);
      
    if (test.length === 1 ) setLiked(true);
    else setLiked(false);
    
  };
  

  const count = likes.length;
  const avatar = owner.avatar?.url;

  useEffect(() => {
    socket.emit('roomComment', alertId);
    socket.on(`add${alertId}`, (alert) => {
      if(!alert) return;
      setComments([...comments, alert.comments[alert.comments.length - 1]]);
    });
  }, [comments]);

  useEffect(() => {
    socket.emit('roomLike', alertId);
    socket.on(`like${alertId}`, (alert) => {
      if(!alert) return;
      if (alert.likes.length === 0) setLikes([]);
      else setLikes([...alert.likes]);
    });
  }, [likes]);

  if (!review) return null;
  return (
  <>


    <div className=" ">
  <div className="bg-transparent border  max-w-lg border-light-subtle dark:border-dark-subtle">
    <div className="flex items-center  px-4 py-3 ">
    
    {school ? (<div className="flex items-center justify-center ">
        <IoAlert className="w-16 h-16 md:min-w-[60px]  md:max-w-[280px] md:min-h-[60px]  md:max-h-[280px] rounded-full bg-highlight dark:bg-highlight-dark text-white text-xl md:text-4xl select-none"/>
        </div>  
        ): teacher ? (<div className="flex items-center justify-center ">
        <IoAlert className="w-16 h-16 md:min-w-[60px]  md:max-w-[280px] md:min-h-[60px]  md:max-h-[280px] rounded-full bg-warning text-white text-xl md:text-4xl select-none"/>
        </div>
        ): avatar ? (<img
                className="w-16 h-16  rounded-full "
                src={avatar}
                alt="{name}"
              />):( <div className="flex items-center "><span className="w-16 h-16 md:min-w-[60px]  md:max-w-[280px] md:min-h-[60px]  md:max-h-[280px] rounded-full bg-light-subtle dark:bg-dark-subtle text-white text-2xl md:text-4xl select-none flex items-center justify-center">
        {getNameInitial(owner.name)}
        </span>
        </div>)
            }
      
      <div className="ml-3 w-full">
        {school ? (<Link to={`/school/${school._id}`}>
          <span className="text-sm font-semibold antialiased block leading-tight dark:text-white text-secondary">{owner.name}</span>
          <span className="dark:text-highlight-dark text-highlight text-xs block">@{school?.SchoolName}</span>
          </Link>
          ) : teacher ? (<Link to={`/teacher/${teacher._id}`}>
            <span className="text-sm font-semibold antialiased block leading-tight dark:text-white text-secondary">{owner.name}</span>
            <span className="dark:text-highlight-dark text-highlight text-xs block">@{teacher?.name}</span>
            </Link>
            ) : (<Link to={`/profile/${owner._id}`}>
                  <span className="text-sm font-semibold antialiased block leading-tight dark:text-white text-secondary">{owner.name}</span>
                  <span className="dark:text-highlight-dark text-highlight text-xs block">@{owner?.name}</span>
                  </Link>
      )}
        
        
        
        
      </div>
     
      
      <div className="flex w-full  object-right-top justify-end text-xl font-semibold antialiased dark:text-highlight-dark text-highlight  ">
        { owner._id === profileId ? (<>
        {school ? (<button onClick={displayConfirmModal} path='alertSchool' type="button">
          <RiDeleteBack2Line />
          </button>
          ) : teacher ? (<button onClick={displayConfirmModal} path='alertTeacher' type="button">
            <RiDeleteBack2Line />
            </button>
            ) : (<button onClick={displayConfirmModal} path='post' type="button">
              <RiDeleteBack2Line />
              </button>
              )}</>):(null)
          }
        
      </div>
    </div>
    <div className="ml-3 ">
        <span className="text-sm font-semibold antialiased block leading-tight dark:text-white text-secondary">{content}</span>
        <span className="text-light-subtle dark:text-dark-subtle text-xs block text-right mr-1 mt-1">Posted@{createdAt.toString().split("T")[0]}</span>
      </div>
    
    <div className="w-full    object-fill ">
    {image ? ( <img  src={image.url} alt="" className="w-full object-fill" />
              ) : null}
    </div>
    <div className="flex items-center justify-between mx-4 mt-3 mb-2">
      <div className="flex gap-5  dark:text-white text-secondary">
        {school ? ( <>
          { liked ?  (<button onClick={addLikeSchool} type="button"><FaHeart className="text-highlight-dark "/></button>
        ):(<button  onClick={addLikeSchool} type="button"><FaRegHeart/></button>)
        }</>

        ) : teacher ? ( <>
          { liked ?  (<button onClick={addLikeTeacher}  type="button"><FaHeart className="text-highlight-dark "/></button>
        ):(<button onClick={addLikeTeacher}  type="button"><FaRegHeart/></button>)
        }</>
        ) : (<>
        
        { liked ?  (<button onClick={addLike} type="button"><FaHeart className="text-highlight-dark "/></button>
        ):(<button onClick={addLike} type="button"><FaRegHeart/></button>)
        }</>
        )}
 
        
        
        <button onClick={displayComments} type="button">
        <FaRegComment/>
        </button>
        
      </div>
      <div className="flex dark:text-highlight-dark text-highlight">
        {likes.length === 1 ? (
          <div className="font-semibold text-sm mx-4 mt-2 mb-4">{count} like</div>
        ) : (<div className="font-semibold text-sm mx-4 mt-2 mb-4">{count} likes</div>)}
     
      </div>
    </div>
    {showComments ? (<>
      <div className="p-2">
{school? (<PostCommentForm placeholder='Comment on Alert' inputClassName="border-1 dark:border-dark-subtle border-light-subtle  bg-transparent text-sm outline-none dark:focus:border-white focus:border-primary transition text-light-subtle dark:text-dark-subtle w-full  text-sm lg:text-md  "
        onSubmit={handleSearchSubmit} path="alertsSchool" />
        ) : teacher ? (<PostCommentForm placeholder='Comment on Alert' inputClassName="border-1 dark:border-dark-subtle border-light-subtle  bg-transparent text-sm outline-none dark:focus:border-white focus:border-primary transition text-light-subtle dark:text-dark-subtle w-full  text-sm lg:text-md  "  
        onSubmit={handleSearchSubmit} path="alertsTeacher" />
        ) : (<PostCommentForm placeholder='Comment on Alert' inputClassName="border-1 dark:border-dark-subtle border-light-subtle  bg-transparent text-sm outline-none dark:focus:border-white focus:border-primary transition text-light-subtle dark:text-dark-subtle w-full  text-sm lg:text-md  "
        onSubmit={handleSearchSubmit} path="post" />
        )}
  </div>
    
      <div className="font-semibold text-sm mx-4 mt-2 mb-4 dark:text-white text-secondary " >Comments:</div>
            {comments.slice(0).reverse().map((comment) => ( 
              <CommentCard comment={comment} key={comment._id} />
              
              ))}
              
    
    </>
      ) : null  }
 
      </div>
    </div>
      {school ? (<ConfirmModal
        visible={showConfirmModal}
        onCancel={hideConfirmModal}
        onConfirm={handleDeleteConfirm}
        busy={busy}
        title="Are you sure?"
        path="alertSchool"
        subtitle="This action will remove this review permanently."
      />) : teacher ? (<ConfirmModal

        visible={showConfirmModal}
        onCancel={hideConfirmModal}
        onConfirm={handleDeleteConfirm}
        busy={busy}
        title="Are you sure?"
        path="alertTeacher"
        subtitle="This action will remove this review permanently."
      />) : (
      <ConfirmModal
        visible={showConfirmModal}
        onCancel={hideConfirmModal}
        onConfirm={handleDeleteConfirm}
        busy={busy}
        title="Are you sure?"
        path="post"
        subtitle="This action will remove this review permanently."
      />
      )}

    </>
  );
};
const CommentCard = ({ comment }) => {

  return (<div className="font-semibold text-sm mx-4 mt-2 mb-4 dark:text-white text-secondary"><Link to={`/profile/${comment.user._id}`} >{comment.user.name} </Link>: <span className="text-light-subtle dark:text-dark-subtle">{comment.content}</span> </div>

  );

}