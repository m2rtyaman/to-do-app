const Todo = require("./todos");
const User = require("./users");
// Kullanıcıya özel bir yapılacak öğesi oluşturma
async function createTodoForUser(userId, todoContent) {
    try {
        // İlgili kullanıcıyı veritabanından al
        const user = await User.findOne({ where: { id: userId } });
        // Kullanıcı varsa yapılacak öğesini oluştur ve ilişkilendir
        if (user) {
            const todo = await Todo.create({
                userid: user.id,// Kullanıcı kimliğini belirt
                content: todoContent // Yapılacak içeriği
            });
            return todo;
        } else {
            throw new Error("Kullanıcı bulunamadı");
        }
    } catch (error) {
        console.error("Yapılacak öğesi oluşturulurken bir hata oluştu:", error);
        throw error;
    }
}
async function deleteTodo(userID, TodoContent) {
    try {
        await Todo.destroy({
            where: {
                userid: userID.toString(),
                content: TodoContent
            }
        });
        console.log("Görev başarıyla silindi.");
    } catch (err) {
        console.error(`Öğe silinirken bir hata oluştu: ${err}`);
    }
}



module.exports = {
    createTodoForUser,
    deleteTodo,
}