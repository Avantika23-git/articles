const supabaseClient= supabase.createClient("https://cifiugsptllwesdikmyd.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpZml1Z3NwdGxsd2VzZGlrbXlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNTc1MjksImV4cCI6MjA4MDgzMzUyOX0.NvhLspfxS4QDZvfdw1isyEO9ip6bKkWxMDWikVZHDsw");
loadArticles();
async function loadArticles() {
    const { data: articles } =await supabaseClient 
    .from("articles")
    .select("*")
    .order("created_at", {ascending:false});
    
    const list = document.getElementById("articleslist");
    list.innerHTML = "";

    articles.forEach(a => {
        list.innerHTML +=`
        <div class = "article-card">
            <h3>${a.title}</h3>
            <p><b>Author:</b> ${a.author}</p>
            <p><b>Category:</b> ${a.category}</p>
            <p>${a.content}</p>
        </div>`;
    });
    
}
async function searchArticles() {
    const keyword = document.getElementById("searchInput").value;

    const { data: results } = await supabaseClient
        .from("articles")
        .select("*")
        .or(`title.ilike.%${keyword}%,category.ilike.%${keyword}%`);

    const list = document.getElementById("articleslist");
    list.innerHTML = "";

    results.forEach(a => {
        list.innerHTML += `
        <div class="article-card">
            <h3>${a.title}</h3>
            <p><b>Author:</b> ${a.author}</p>
            <p><b>Category:</b> ${a.category}</p>
            <p>${a.content}</p>
        </div>`;
    });
}

document.getElementById("articleform").addEventListener("submit",async(e)=>{
    e.preventDefault();

    const title =document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const category = document.getElementById("category").value;
    const content = document.getElementById("content").value;

    const {error} = await supabaseClient 
    .from("articles")
    .insert([{title,author,category,content}])

    if(error){
        alert("Error posting article!");
    }
    else {
        alert("Article published!");
        loadArticles();
        e.target.reset();
    }
})

