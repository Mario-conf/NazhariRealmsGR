export interface BlogPost {
  slug: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: 'top-5-beginner-hikes',
    title: 'Top 5 Hikes for Beginners in the Alps',
    author: 'Jane Doe',
    date: 'October 26, 2023',
    excerpt:
      'Just starting your hiking journey? Here are five breathtaking yet manageable trails in the Alps to get you started.',
    content: `
      <h2>Introduction</h2>
      <p>The Alps can be intimidating, but there are plenty of trails perfect for those new to hiking. This guide will walk you through five of our favorites.</p>
      <h3>1. The Eibsee Loop, Germany</h3>
      <p>A stunning walk around a crystal-clear lake with the Zugspitze as a backdrop. It's mostly flat and offers incredible photo opportunities.</p>
      <h3>2. Oeschinensee, Switzerland</h3>
      <p>A panoramic trail that provides stunning views of the turquoise Oeschinen Lake. The path is well-maintained and suitable for all skill levels.</p>
      <h3>3. Tre Cime di Lavaredo Loop, Italy</h3>
      <p>This trail in the Dolomites offers iconic views of the "Three Peaks." While it has some elevation gain, it's a rewarding experience for any beginner.</p>
      <h3>4. Lac Blanc, France</h3>
      <p>Located near Chamonix, this hike offers some of the best views of the Mont Blanc massif. It's a popular trail, and for good reason.</p>
      <h3>5. The Almenwelt Lofer, Austria</h3>
      <p>A family-friendly area with a variety of easy trails through alpine pastures. Perfect for a relaxed day in the mountains.</p>
    `,
  },
  {
    slug: 'review-osprey-atmos-ag-65',
    title: 'Product Review: Osprey Atmos AG 65 Backpack',
    author: 'John Smith',
    date: 'November 2, 2023',
    excerpt:
      "Is the Osprey Atmos AG 65 the king of backpacking packs? We took it on a 5-day trek to find out.",
    content: `
      <h2>First Impressions</h2>
      <p>The Osprey Atmos AG 65 has a reputation for comfort, and it doesn't disappoint. The Anti-Gravity suspension system feels like it's hugging your back.</p>
      <h3>Comfort and Fit</h3>
      <p>The fit is highly adjustable, and once dialed in, the pack distributes weight exceptionally well. We experienced no sore spots even after long days on the trail.</p>
      <h3>Storage and Organization</h3>
      <p>With a 65-liter capacity, there's plenty of room. The pocket layout is intuitive, with a large main compartment, a sleeping bag compartment, and several external pockets.</p>
      <h2>The Verdict</h2>
      <p>This backpack lives up to the hype. It's an investment, but for serious backpackers who prioritize comfort and functionality, it's worth every penny.</p>
    `,
  },
  {
    slug: 'leave-no-trace',
    title: 'The 7 Principles of Leave No Trace',
    author: 'Eco Warriors',
    date: 'November 10, 2023',
    excerpt:
      'Responsible hiking means protecting our natural spaces. Learn the seven core principles of Leave No Trace to minimize your impact.',
    content: `
      <h2>Why It Matters</h2>
      <p>As more people discover the joy of the outdoors, our collective impact grows. Following Leave No Trace principles is crucial for preserving wilderness for future generations.</p>
      <h3>The Principles</h3>
      <ol>
        <li><strong>Plan Ahead and Prepare:</strong> Know the regulations and special concerns for the area you'll visit.</li>
        <li><strong>Travel and Camp on Durable Surfaces:</strong> Use established trails and campsites.</li>
        <li><strong>Dispose of Waste Properly:</strong> Pack it in, pack it out.</li>
        <li><strong>Leave What You Find:</strong> Preserve the past: examine, but do not touch, cultural or historic structures and artifacts.</li>
        <li><strong>Minimize Campfire Impacts:</strong> Use a lightweight stove for cooking and enjoy a candle lantern for light.</li>
        <li><strong>Respect Wildlife:</strong> Observe wildlife from a distance. Do not follow or approach them.</li>
        <li><strong>Be Considerate of Other Visitors:</strong> Respect other visitors and protect the quality of their experience.</li>
      </ol>
    `,
  },
];

export function getBlogPosts() {
  return blogPosts;
}

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
