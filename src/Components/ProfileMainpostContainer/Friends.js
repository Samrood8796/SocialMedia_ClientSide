import UserCard from './UserCard'
const Friends = ({ type, data, render, forceRender }) => {
  return (
    <>
      <div className='w-100'>
        <h1 className='text-xl py-2'>{type}</h1>
      </div>
      <div className='flex flex-wrap '>
        {data.length < 1 ? <div className='bg-white mt-2 rounded p-28 text-3xl font-semibold'>No {type} !!</div> :

          data.map((item) => (
            <UserCard type={type} render={render} forceRender={forceRender}  key={item._id} name={item.name} userName={item.userName} profilePic={item.profilePic} id={item._id} />
          ))
        }
      </div>
    </>
  )
}

export default Friends