import React, {useState, useEffect, useRef} from 'react';


const VoiceVideoSettings = () => {
  const [voice_video_settings, setSettings] = useState({
      voiceVolume: 50,
      videoQuality: "720p",
  });

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      window.api.send('get-settings', {key: "voice_video"});
        window.api.on('settings-reply', (event, receivedSettings) => {
          setSettings(receivedSettings)
      });
      window.api.removeAllListeners('settings-reply');
      isFirstRender.current = false;
      return;
    }
    
    handleSaveSettings()
    console.log(voice_video_settings);
  }, [voice_video_settings]);

  const handleVolumeChange = (e) => {
    setSettings({
      ...voice_video_settings,
      voiceVolume: parseInt(e.target.value, 10),
    });
  };

  const handleQualityChange = (e) => {
    setSettings({
      ...voice_video_settings,
      videoQuality: e.target.value,
    });
  };

  const handleSaveSettings = () => {
    window.api.send('save-settings', {key: "voice_video", data: voice_video_settings});
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
          value={voice_video_settings.voiceVolume}
          onChange={handleVolumeChange}
        />
        <span>{voice_video_settings.voiceVolume}%</span>
      </div>
      <div>
        <label>Video Quality:</label>
        <select value={voice_video_settings.videoQuality} onChange={handleQualityChange}>
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
