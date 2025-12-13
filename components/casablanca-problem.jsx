"use client";

import { AlertCircle, Users, ShoppingCart, PhoneOff } from 'lucide-react';

export default function CasablancaProblem() {
  const problems = [
    {
      icon: Users,
      title: 'ما عندكش وجود رقمي',
      description: 'الناس كيدورو على خدماتك على جوجل و ما كيلقاوكش. كيضيعو عليك زبون تلو الآخر.',
    },
    {
      icon: ShoppingCart,
      title: 'ما كيطلبوش من عندك',
      description: 'حتى لو عندك صفحة على فيسبوك، الناس ما كيعرفوش كيفاش يطلبوا. كيحتارو و كيضيعو.',
    },
    {
      icon: PhoneOff,
      title: 'ما كيتصلوش بيك',
      description: 'رقمك موجود، ولكن الناس ما كيتصلوش. ما عندهمش طريقة سهلة و واضحة للتواصل معاك.',
    },
    {
      icon: AlertCircle,
      title: 'المنافسين كيسبقوك',
      description: 'اللي عندهم موقع أو تطبيق واضح كياخدو الزبون قبل ماك. أنت كتخسر فرص.',
    },
  ];

  return (
    <section className="py-24 bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            المشاكل اللي كتعاني منها <span className="text-red-500">كل يوم</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            إذا كنت صاحب مطعم، صالون، أو محل في كازابلانكا، هاد المشاكل كتعرفها بزاف:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-background border border-border/50 rounded-xl p-6 hover:border-red-500/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <problem.icon className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{problem.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg font-medium text-foreground">
            النتيجة: <span className="text-red-500">زبون كيضيع، فرص كتضيع، فلوس كتضيع</span>
          </p>
        </div>
      </div>
    </section>
  );
}
