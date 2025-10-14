import pool from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  const { name, email, role } = req.body;
  try {
    const temp = Math.random().toString(36).slice(-8);
    const hashed = await bcrypt.hash(temp, 10);
    const r = await pool.query(
      'INSERT INTO users (name,email,password,role,must_change_password) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [name,email,hashed,role,true]
    );
    res.json({ user: r.rows[0], tempPassword: temp });
  } catch (err) {
    console.error(err); res.status(500).json({error: err.message});
  }
};

export const login = async (req,res) => {
  const { email, password } = req.body;
  try {
    const r = await pool.query('SELECT * FROM users WHERE email=$1',[email]);
    if (!r.rows.length) return res.status(404).json({error:'Usuário não encontrado'});
    const user = r.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({error:'Senha incorreta'});
    if (user.must_change_password) return res.status(403).json({error:'Trocar senha'});
    const token = jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn:'8h'});
    res.json({token, user});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

export const changePassword = async (req,res) => {
  const { email, oldPassword, newPassword } = req.body;
  try {
    const r = await pool.query('SELECT * FROM users WHERE email=$1',[email]);
    if (!r.rows.length) return res.status(404).json({error:'Usuário não encontrado'});
    const user = r.rows[0];
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.status(400).json({error:'Senha atual incorreta'});
    const hashed = await bcrypt.hash(newPassword, 10);
    await pool.query('UPDATE users SET password=$1, must_change_password=false WHERE id=$2',[hashed,user.id]);
    res.json({message:'Senha alterada'});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};
