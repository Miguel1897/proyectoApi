import { readData, writeData } from '../utils/fileUtils.js';

const userController = {
  getUsers: async (req, res) => {
    try {
      const data = await readData();
      res.json(data.users);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
  getUserById: async (req, res) => {
    try {
      const data = await readData();
      const id = parseInt(req.params.id);
      const user = data.users.find((user) => user.id === id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
  createUser: async (req, res) => {
    try {
      const data = await readData();
      const body = req.body;
      const newUser = {
        id: data.users.length + 1,
        ...body,
      };
      data.users.push(newUser);
      await writeData(data);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
  updateUser: async (req, res) => {
    try {
      const data = await readData();
      const id = parseInt(req.params.id);
      const body = req.body;
      const userIndex = data.users.findIndex((user) => user.id === id);
      if (userIndex !== -1) {
        data.users[userIndex] = {
          ...data.users[userIndex],
          ...body,
        };
        await writeData(data);
        res.json({ message: "User updated successfully" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const data = await readData();
      const id = parseInt(req.params.id);
      const userIndex = data.users.findIndex((user) => user.id === id);
      if (userIndex !== -1) {
        data.users.splice(userIndex, 1);
        await writeData(data);
        res.json({ message: "User deleted successfully" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default userController;
