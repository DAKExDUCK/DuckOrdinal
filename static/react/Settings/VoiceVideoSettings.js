import React, { useState, useEffect } from 'react';

var voiceVideoSettings = {};
window.settings.get({ key: 'voice_video' }, (receivedSettings) => {
  voiceVideoSettings = receivedSettings
})

const VoiceVideoSettings = () => {
  const [, re_render] = useState(undefined);

  // useEffect(() => {
  //   window.settings.get({ key: 'voice_video' }, (receivedSettings) => {
  //     voiceVideoSettings = receivedSettings
  //   })
  //   console.log(voiceVideoSettings)
  // }, [])

  const handleVolumeChange = (e) => {
    voiceVideoSettings.voiceVolume = parseInt(e.target.value, 10),
    handleSaveSettings()
  };

  const handleQualityChange = (e) => {
    voiceVideoSettings.videoQuality = e.target.value
    handleSaveSettings()
  };

  const handleSaveSettings = () => {
    window.settings.set({key: "voice_video", data: voiceVideoSettings})
    re_render((prev) => !prev);
  };

  return (
    <div>
      <h3>Voice and Video Settings</h3>
      <div>
        <label>Voice Volume:</label>
        <input
          type="range"
          min="0"
          max="100"
          value={voiceVideoSettings.voiceVolume}
          onChange={handleVolumeChange}
        />
        <span>{voiceVideoSettings.voiceVolume}%</span>
      </div>
      <div>
        <label>Video Quality:</label>
        <select value={voiceVideoSettings.videoQuality} onChange={handleQualityChange}>
          <option value="360p">360p</option>
          <option value="720p">720p</option>
          <option value="1080p">1080p</option>
          <option value="4k">4k</option>
        </select>
      </div>
    </div>
  );
};

export default VoiceVideoSettings;
