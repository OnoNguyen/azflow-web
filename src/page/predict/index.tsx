import {useEffect, useState} from 'react';
import axios from 'axios';

export const Predict = () => {
  const [teams, setTeams] = useState([]);
  const [team1Input, setTeam1Input] = useState('');
  const [team2Input, setTeam2Input] = useState('');
  const [team1, setTeam1] = useState({name: '', id: ''});
  const [team2, setTeam2] = useState({name: '', id: ''});
  const [matchDate, setMatchDate] = useState(new Date().toISOString().split('T')[0]);
  const [responseMsg, setResponseMsg] = useState('');
  const [manualTeam1, setManualTeam1] = useState(false);
  const [manualTeam2, setManualTeam2] = useState(false);

  const env = import.meta.env;

  useEffect(() => {
    axios
      .get(`${env.VITE_DOTA_API}/teams`, {
        headers: {accept: 'application/json'},
      })
      .then((res) => setTeams(res.data['teams']))
      .catch((err) => console.error('Failed to fetch teams:', err));
  }, [env.VITE_DOTA_API]);

  const filterTeams = (input) => {
    const term = input.toLowerCase().trim();
    return teams.filter(
      (t) =>
        t.name.toLowerCase().includes(term) ||
        t.id.toString().includes(term)
    );
  };

  const handleSubmit = async () => {
    console.log('team 1:', team1);
    console.log('team 2:', team2);
    try {
      const payload = {
        team_1_id: Number(team1.id),
        team_1_name: team1.name,
        team_2_id: Number(team2.id),
        team_2_name: team2.name,
        match_date: matchDate,
      };
      const res = await axios.post(`${env.VITE_DOTA_API}/predict`, payload);
      setResponseMsg(`Prediction result: ${res.data.message || 'Success'}`);
    } catch (err) {
      setResponseMsg(`Error: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={manualTeam1}
            onChange={() => setManualTeam1(!manualTeam1)}
          />
          Manual
        </label>

        {manualTeam1 ? (
          <>
            <input
              placeholder="Team 1 Name"
              value={team1.name}
              onChange={(e) => setTeam1({...team1, name: e.target.value})}
            />
            <input
              placeholder="Team 1 ID"
              value={team1.id}
              onChange={(e) => setTeam1({...team1, id: e.target.value})}
            />
          </>
        ) : (
          <>
            <label>Team 1:</label>
            <input
              list="team1-options"
              value={team1Input}
              onChange={(e) => {
                const input = e.target.value;
                setTeam1Input(input);
                const match = filterTeams(input)[0];
                if (match) {
                  setTeam1(match);
                } else {
                  setTeam1({name: input, id: ''});
                }
              }}
            />
            <datalist id="team1-options">
              {filterTeams(team1Input).map((team) => (
                <option key={team.id} value={team.name} label={`${team.id}`}/>
              ))}
            </datalist>
          </>
        )}
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={manualTeam2}
            onChange={() => setManualTeam2(!manualTeam2)}
          />
          Manual
        </label>

        {manualTeam2 ? (
          <>
            <input
              placeholder="Team 2 Name"
              value={team2.name}
              onChange={(e) => setTeam2({...team2, name: e.target.value})}
            />
            <input
              placeholder="Team 2 ID"
              value={team2.id}
              onChange={(e) => setTeam2({...team2, id: e.target.value})}
            />
          </>
        ) : (
          <>
            <label>Team 2:</label>
            <input
              list="team2-options"
              value={team2Input}
              onChange={(e) => {
                const input = e.target.value;
                setTeam2Input(input);
                const match = filterTeams(input)[0];
                if (match) {
                  setTeam2(match);
                } else {
                  setTeam2({name: input, id: ''});
                }
              }}
            />
            <datalist id="team2-options">
              {filterTeams(team2Input).map((team) => (
                <option key={team.id} value={team.name} label={`${team.id}`}/>
              ))}
            </datalist>
          </>
        )}
      </div>

      <div>
        <label>Match Date:</label>
        <input
          type="date"
          value={matchDate}
          onChange={(e) => setMatchDate(e.target.value)}
        />
      </div>

      <button onClick={handleSubmit}>Submit</button>

      <div>{responseMsg}</div>
    </div>
  );
};