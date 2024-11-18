export const UserCard = ({ user }) => (
  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
    <img 
      src={user.picture.medium} 
      alt={`${user.name.first} ${user.name.last}`}
      className="w-16 h-16 rounded-full mx-auto mb-4"
    />
    <div className="text-center">
      <h3 className="text-lg font-semibold text-gray-800">
        {user.name.first} {user.name.last}
      </h3>
      <p className="text-sm text-gray-500 mt-1">{user.email}</p>
    </div>
  </div>
); 