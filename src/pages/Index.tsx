import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  features: string[];
  comparison: {
    original: string;
    copy: string;
  };
}

const products: Product[] = [
  {
    id: 1,
    name: 'AirPods Pro (копия)',
    price: '3 990 ₽',
    image: 'https://cdn.poehali.dev/projects/36c6d6e2-3305-41ab-8575-7d6df6cb1b41/files/b1d1af5f-404d-4a12-b1ee-5addc2a72fa6.jpg',
    features: ['Активное шумоподавление', 'Прозрачный режим', 'Пространственный звук', 'До 4.5 часов работы'],
    comparison: {
      original: 'Оригинал: 24 990 ₽',
      copy: 'Копия: 3 990 ₽'
    }
  },
  {
    id: 2,
    name: 'Apple Watch Series 8 (копия)',
    price: '5 490 ₽',
    image: 'https://cdn.poehali.dev/projects/36c6d6e2-3305-41ab-8575-7d6df6cb1b41/files/6cf04e1d-336c-4b52-9e19-92e79ce7ce1a.jpg',
    features: ['Экран Always-On', 'Мониторинг здоровья', 'Водонепроницаемость', 'До 18 часов работы'],
    comparison: {
      original: 'Оригинал: 44 990 ₽',
      copy: 'Копия: 5 490 ₽'
    }
  },
  {
    id: 3,
    name: 'MagSafe зарядка (копия)',
    price: '1 290 ₽',
    image: 'https://cdn.poehali.dev/projects/36c6d6e2-3305-41ab-8575-7d6df6cb1b41/files/2a6a8784-dcb9-4553-bf26-2feeb5bb0a1d.jpg',
    features: ['Быстрая зарядка 15W', 'Магнитное крепление', 'Совместимость с iPhone', 'Компактный дизайн'],
    comparison: {
      original: 'Оригинал: 4 490 ₽',
      copy: 'Копия: 1 290 ₽'
    }
  }
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [compareProduct, setCompareProduct] = useState<number | null>(null);
  const sectionRefs = {
    home: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    catalog: useRef<HTMLElement>(null),
    delivery: useRef<HTMLElement>(null),
    promo: useRef<HTMLElement>(null),
    contacts: useRef<HTMLElement>(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const section = sectionRefs[id as keyof typeof sectionRefs].current;
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold">AIRZONE</span>
            </div>
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'catalog', 'delivery', 'promo', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === section ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'about' && 'О нас'}
                  {section === 'catalog' && 'Каталог'}
                  {section === 'delivery' && 'Доставка'}
                  {section === 'promo' && 'Акции'}
                  {section === 'contacts' && 'Контакты'}
                </button>
              ))}
            </div>
            <Button size="sm" className="hidden md:flex">
              <Icon name="ShoppingCart" className="mr-2 h-4 w-4" />
              Корзина
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        <section
          id="home"
          ref={sectionRefs.home}
          className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <Badge className="mb-6 animate-fade-in" variant="secondary">
              🔹 Apple-техника премиум качества
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in text-balance">
              Копии без отличий
              <br />
              <span className="text-primary">от оригинала</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto animate-fade-in text-balance">
              Качество • Надёжность • Цена ниже рынка
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
              <Button size="lg" onClick={() => scrollToSection('catalog')} className="text-lg px-8">
                Смотреть каталог
                <Icon name="ArrowRight" className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('contacts')} className="text-lg px-8">
                Связаться
              </Button>
            </div>
          </div>
        </section>

        <section id="about" ref={sectionRefs.about} className="py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Почему AIRZONE</h2>
              <p className="text-xl text-muted-foreground">Наши преимущества</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: 'CheckCircle2',
                  title: 'Как оригинал',
                  description: 'Внешне и по функциям — неотличимы от оригинальной техники Apple'
                },
                {
                  icon: 'Shield',
                  title: 'Проверка качества',
                  description: 'Тщательная проверка перед отправкой и возможность осмотра перед оплатой'
                },
                {
                  icon: 'Zap',
                  title: 'Быстрая доставка',
                  description: 'Доставка по городу в день заказа или отправка в регионы'
                },
                {
                  icon: 'Award',
                  title: 'Премиум сборка',
                  description: 'Отличное качество материалов и сборки, долгий срок службы'
                },
                {
                  icon: 'DollarSign',
                  title: 'Честные цены',
                  description: 'Цены в 5-7 раз ниже оригинала без скрытых переплат'
                },
                {
                  icon: 'HeadphonesIcon',
                  title: 'Поддержка 24/7',
                  description: 'Всегда на связи в Telegram для консультаций и вопросов'
                }
              ].map((item, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                      <Icon name={item.icon} className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="catalog" ref={sectionRefs.catalog} className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Наш ассортимент</h2>
              <p className="text-xl text-muted-foreground">Премиум копии Apple-техники</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group">
                  <div className="aspect-square overflow-hidden bg-muted/30">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                    <p className="text-3xl font-bold text-primary mb-4">{product.price}</p>
                    <ul className="space-y-2 mb-6">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm text-muted-foreground">
                          <Icon name="Check" className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant={compareProduct === product.id ? 'secondary' : 'outline'}
                      className="w-full mb-2"
                      onClick={() => setCompareProduct(compareProduct === product.id ? null : product.id)}
                    >
                      <Icon name="GitCompare" className="mr-2 h-4 w-4" />
                      {compareProduct === product.id ? 'Скрыть сравнение' : 'Сравнить с оригиналом'}
                    </Button>
                    {compareProduct === product.id && (
                      <div className="mt-4 p-4 bg-muted/50 rounded-lg animate-accordion-down">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-muted-foreground">{product.comparison.original}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-primary">{product.comparison.copy}</span>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Экономия {Math.round((1 - parseInt(product.price.replace(/\D/g, '')) / parseInt(product.comparison.original.replace(/\D/g, ''))) * 100)}%
                          </Badge>
                        </div>
                      </div>
                    )}
                    <Button className="w-full mt-2">
                      <Icon name="ShoppingCart" className="mr-2 h-4 w-4" />
                      В корзину
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="delivery" ref={sectionRefs.delivery} className="py-24 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Доставка и оплата</h2>
              <p className="text-xl text-muted-foreground">Удобные способы получения заказа</p>
            </div>
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon name="MapPin" className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Доставка по городу</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Курьерская доставка в день заказа. Оплата после получения и проверки товара.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon name="Truck" className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Отправка в регионы</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Отправка транспортными компаниями. Трек-номер для отслеживания посылки.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon name="CreditCard" className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Способы оплаты</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Наличные, переводом на карту или через Систему Быстрых Платежей (СБП).
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="promo" ref={sectionRefs.promo} className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">🔥 Акции</h2>
              <p className="text-xl text-muted-foreground">Специальные предложения</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-primary/10 to-primary/5">
                <CardContent className="p-8">
                  <Badge className="mb-4">Акция</Badge>
                  <h3 className="text-2xl font-bold mb-3">Скидка на второй товар</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    При покупке двух товаров — скидка 15% на второй товар из заказа
                  </p>
                  <Button>
                    Выбрать товары
                    <Icon name="ArrowRight" className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-xl bg-gradient-to-br from-secondary/10 to-secondary/5">
                <CardContent className="p-8">
                  <Badge className="mb-4" variant="secondary">Подарок</Badge>
                  <h3 className="text-2xl font-bold mb-3">Подарки к заказам</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Защитное стекло или чехол в подарок к каждому заказу от 5000 ₽
                  </p>
                  <Button variant="secondary">
                    Узнать больше
                    <Icon name="Gift" className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
            <Card className="mt-8 border-0 shadow-xl bg-gradient-to-r from-primary to-secondary text-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-3">Обновления ассортимента каждую неделю</h3>
                <p className="text-white/90 mb-6">
                  Подпишитесь на наш Telegram-канал, чтобы первыми узнавать о новинках
                </p>
                <Button variant="secondary" size="lg">
                  <Icon name="Bell" className="mr-2 h-5 w-5" />
                  Подписаться
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="contacts" ref={sectionRefs.contacts} className="py-24 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Связаться с нами</h2>
              <p className="text-xl text-muted-foreground">Мы всегда на связи</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="MessageCircle" className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Telegram</h3>
                  <p className="text-muted-foreground mb-4">Быстрая связь через мессенджер</p>
                  <Button className="w-full" size="lg">
                    <Icon name="Send" className="mr-2 h-4 w-4" />
                    Написать в Telegram
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Mail" className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Написать менеджеру</h3>
                  <p className="text-muted-foreground mb-4">Получите консультацию по товарам</p>
                  <Button variant="outline" className="w-full" size="lg">
                    <Icon name="MessageSquare" className="mr-2 h-4 w-4" />
                    Задать вопрос
                  </Button>
                </CardContent>
              </Card>
            </div>
            <Card className="mt-8 border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6 text-center">Частые вопросы</h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Это настоящие копии или подделки?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Мы продаём качественные копии Apple-техники, которые повторяют дизайн и функционал оригинала. 
                      Все товары проходят проверку перед отправкой.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Какая гарантия на товары?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      На все товары предоставляется гарантия 14 дней. Если обнаружите брак — заменим или вернём деньги.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Как долго идёт доставка?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      По городу доставляем в день заказа. В регионы отправка занимает 3-7 дней в зависимости от транспортной компании.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Можно ли вернуть товар?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Да, в течение 14 дней можно вернуть товар, если он не был в использовании и сохранена упаковка.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="text-xl font-bold">AIRZONE</span>
              </div>
              <p className="text-sm text-secondary-foreground/70">
                Копии Apple-техники премиум качества по доступным ценам
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm text-secondary-foreground/70">
                <li>AirPods</li>
                <li>Apple Watch</li>
                <li>Зарядные устройства</li>
                <li>Аксессуары</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-secondary-foreground/70">
                <li>О компании</li>
                <li>Доставка</li>
                <li>Оплата</li>
                <li>Гарантии</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-secondary-foreground/70">
                <li>Telegram: @airzone</li>
                <li>Работаем 24/7</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-secondary-foreground/20 pt-8 text-center text-sm text-secondary-foreground/70">
            © 2024 AIRZONE. Все права защищены
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
