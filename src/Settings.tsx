import { useState } from 'react';
import { GameConfig } from './types';

interface SettingsProps {
    setGameConfig: (config: GameConfig) => void;
} 

const Settings = ({setGameConfig}: SettingsProps) => {
    const [rows, setRows] = useState('9');
    const [columns, setCols] = useState('9');
    const [bombs, setBombs] = useState('10');

    const handleSave = () => {
        setGameConfig({ rows: Number(rows), columns: Number(columns), bombs: Number(bombs) });
    }

    return (
        <div className="settingsContainer">
            <h4>Game Settings</h4>
            <label>
                Rows:
                <input type="number" value={rows} onChange={(e)=> {setRows(e.target.value)}} />
            </label>
            <label>
                Columns:
                <input type="number" value={columns} onChange={(e)=> {setCols(e.target.value)}} />
            </label>
            <label>
                Bombs:
                <input type="number" value={bombs} onChange={(e)=> {setBombs(e.target.value)}} />
            </label>
            <button onClick={handleSave}>Save</button>
        </div>
    )
}


export default Settings;