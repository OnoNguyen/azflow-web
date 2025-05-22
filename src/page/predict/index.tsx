import React, {useEffect, useState} from 'react';
import axios from 'axios';

export const Predict = () => {
  const [teams, setTeams] = useState([]);
  const [team1Input, setTeam1Input] = useState('');
  const [team2Input, setTeam2Input] = useState('');
  const [team1, setTeam1] = useState({name: '', id: ''});
  const [team2, setTeam2] = useState({name: '', id: ''});
  const [matchDate, setMatchDate] = useState(new Date().toISOString().split('T')[0]);
  const [responseData, setResponseData] = useState({});
  const [manualTeam1, setManualTeam1] = useState(false);
  const [manualTeam2, setManualTeam2] = useState(false);
  const [boOption, setBoOption] = useState('bo1');
  const [team1Odds, setTeam1Odds] = useState('');
  const [tieOdds, setTieOdds] = useState('');
  const [team2Odds, setTeam2Odds] = useState('');

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
        bo: boOption,
        team_1_odds: team1Odds,
        tie_odds: tieOdds,
        team_2_odds: team2Odds
      };
      const res = await axios.post(`${env.VITE_DOTA_API}/predict`, payload);
      setResponseData(res.data);
    } catch (err) {
      setResponseData({"error": err.response?.data?.message || err.message});
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
      <div>
        <label>Best of:</label>
        <label>
          <input
            type="radio"
            value="bo1"
            checked={boOption === 'bo1'}
            onChange={(e) => setBoOption(e.target.value)}
          />
          BO1
        </label>
        <label>
          <input
            type="radio"
            value="bo2"
            checked={boOption === 'bo2'}
            onChange={(e) => setBoOption(e.target.value)}
          />
          BO2
        </label>
        <label>
          <input
            type="radio"
            value="bo3"
            checked={boOption === 'bo3'}
            onChange={(e) => setBoOption(e.target.value)}
          />
          BO3
        </label>
      </div>
      <div>
        <label>Team 1 Best Odds:</label>
        <input
          type="number"
          step="0.01"
          value={team1Odds}
          onChange={(e) => setTeam1Odds(e.target.value)}
          placeholder="e.g. 1.85"
        />
      </div>

      <div>
        <label>Tie Best Odds:</label>
        <input
          type="number"
          step="0.01"
          value={tieOdds}
          onChange={(e) => setTieOdds(e.target.value)}
          disabled={boOption !== 'bo2'}
          placeholder="e.g. 2.30"
        />
      </div>

      <div>
        <label>Team 2 Best Odds:</label>
        <input
          type="number"
          step="0.01"
          value={team2Odds}
          onChange={(e) => setTeam2Odds(e.target.value)}
          placeholder="e.g. 1.95"
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>

      <PredictResult responseData={responseData} team1={team1} team2={team2}/>

    </div>
  );
};

type PredictResultProps = {
  responseData: Record<string, any>;
  team1: { name: string };
  team2: { name: string };
};

const PredictResult: React.FC<PredictResultProps> = ({responseData, team1, team2}) => {
  const {
    error,
    team_1_winning_prob,
    team_2_winning_prob,
    team_1_fraction,
    team_2_fraction,
    tie_fraction,
    team_1_fair_odds,
    team_2_fair_odds,
    tie_fair_odds,
    vig,
  } = responseData;

  const t1WP = Number(team_1_winning_prob);
  const t2WP = Number(team_2_winning_prob);
  const t1F = Number(team_1_fraction);
  const t2F = Number(team_2_fraction);
  const tieF = Number(tie_fraction);
  const t1FO = Number(team_1_fair_odds);
  const t2FO = Number(team_2_fair_odds);
  const tieFO = Number(tie_fair_odds);
  const v = Number(vig);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div>
        {team1.name} ({(t1WP * 100).toFixed(2)}%) vs {team2.name} ({(t2WP * 100).toFixed(2)}%)
      </div>
      <div>
        {team1.name} fraction: {(t1F * 100).toFixed(2)}, fair prob: {(t1FO * 100).toFixed(2)}%, fair
        odds: {(1 / t1FO).toFixed(2)}
      </div>
      <div>
        Tie fraction: {(tieF * 100).toFixed(2)}, fair prob: {(tieFO * 100).toFixed(2)}%, fair
        odds: {(1 / tieFO).toFixed(2)}
      </div>
      <div>
        {team2.name} fraction: {(t2F * 100).toFixed(2)}%, fair prob: {(t2FO * 100).toFixed(2)}%, fair
        odds: {(1 / t2FO).toFixed(2)}
      </div>
      <div>Vig: {(v * 100).toFixed(2)}%</div>
    </>
  );
};