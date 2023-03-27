import React from 'react';

function ResponseExample() {
  const response = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis fermentum lorem, vel fermentum velit viverra sed. Donec id urna felis. Duis non consectetur nibh, in blandit enim. Ut sodales diam leo, ac blandit arcu vehicula eu. Vivamus id arcu justo. Cras laoreet nunc et velit ultrices, a lacinia ipsum vestibulum. Nam dictum aliquet libero ac egestas. Ut ac bibendum mauris. In hac habitasse platea dictumst. Suspendisse gravida, est ut auctor efficitur, libero mi laoreet justo, ac dignissim velit velit ut velit.`;

  return (
    <div>
      <h2 className="text-black text-xl font-bold mb-4">Response Example</h2>
      <div className="bg-gray-100 p-4 rounded-md">
        <textarea className="text-black w-full h-40 border border-gray-300 p-2" value={response} readOnly />
      </div>
    </div>
  );
}

export default ResponseExample;